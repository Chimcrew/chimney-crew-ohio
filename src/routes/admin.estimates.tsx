import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { sendEstimateAdmin, listEstimatesAdmin } from '@/lib/admin-estimates.functions'
import type { LineItem } from '@/lib/email-templates/estimate-invoice'
import { Trash2, Plus, Eye, Download, Send, ImagePlus, Copy } from 'lucide-react'
import { generateEstimatePdf, fileToPhoto, type EstimatePdfData } from '@/lib/estimate-pdf'
import { ESTIMATE_PRESETS } from '@/data/estimate-presets'

export const Route = createFileRoute('/admin/estimates')({
  head: () => ({ meta: [
    { title: 'Estimates & Invoices · ChimCrew Admin' },
    { name: 'robots', content: 'noindex,nofollow' },
  ] }),
  component: AdminEstimatesPage,
})

type DocType = 'estimate' | 'invoice'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let binary = ''
  const chunk = 0x8000 // avoid call-stack limits
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      bytes.subarray(i, i + chunk) as unknown as number[],
    )
  }
  return btoa(binary)
}

function withTimeout<T>(p: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(message)), ms)
    p.then(
      (v) => { clearTimeout(t); resolve(v) },
      (e) => { clearTimeout(t); reject(e) },
    )
  })
}

function defaultNumber(t: DocType) {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(Math.random() * 900 + 100)
  return `${t === 'invoice' ? 'INV' : 'EST'}-${stamp}-${rand}`
}

function AdminEstimatesPage() {
  const send = useServerFn(sendEstimateAdmin)
  const listSaved = useServerFn(listEstimatesAdmin)

  const [passcode, setPasscode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [unlockError, setUnlockError] = useState<string | null>(null)

  const [docType, setDocType] = useState<DocType>('estimate')
  const [docNumber, setDocNumber] = useState(defaultNumber('estimate'))
  const [date, setDate] = useState(todayISO())
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [serviceAddress, setServiceAddress] = useState('')
  const [technicianName, setTechnicianName] = useState('')
  const [items, setItems] = useState<LineItem[]>([
    { name: '', description: '', quantity: 1, price: 0 },
  ])
  const [taxPercent, setTaxPercent] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [depositPaid, setDepositPaid] = useState<number>(0)
  const [notes, setNotes] = useState('')
  const [paymentInstructions, setPaymentInstructions] = useState(
    'We accept cash, check, or major credit card. Payment due upon completion unless otherwise noted.',
  )
  const [photos, setPhotos] = useState<{ dataUrl: string; width: number; height: number; name: string }[]>([])
  const [savedItems, setSavedItems] = useState<any[]>([])

  const [sending, setSending] = useState(false)
  const [sendMsg, setSendMsg] = useState<string | null>(null)
  const [sendErr, setSendErr] = useState<string | null>(null)

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 0), 0),
    [items],
  )
  const discounted = Math.max(0, subtotal - (Number(discount) || 0))
  const taxAmount = (discounted * (Number(taxPercent) || 0)) / 100
  const total = discounted + taxAmount
  const balanceDue = Math.max(0, total - (Number(depositPaid) || 0))

  function changeDocType(t: DocType) {
    setDocType(t)
    setDocNumber(defaultNumber(t))
  }

  function updateItem(i: number, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  }
  function onItemNameChange(i: number, value: string) {
    const preset = ESTIMATE_PRESETS.find((p) => p.name === value)
    setItems((prev) => prev.map((it, idx) => {
      if (idx !== i) return it
      const next: LineItem = { ...it, name: value }
      // Auto-fill description only when matching a preset and current desc is empty
      // or was the previous preset's description (so switching presets updates it).
      if (preset) {
        const prevPresetDesc = ESTIMATE_PRESETS.find((p) => p.name === it.name)?.description
        if (!it.description || it.description === prevPresetDesc) {
          next.description = preset.description
        }
      }
      return next
    }))
  }
  function addItem() {
    setItems((prev) => [...prev, { name: '', description: '', quantity: 1, price: 0 }])
  }
  function removeItem(i: number) {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)))
  }

  async function onAddPhotos(files: FileList | null) {
    if (!files?.length) return
    const next: typeof photos = []
    for (const f of Array.from(files)) {
      try {
        const p = await fileToPhoto(f)
        next.push({ ...p, name: f.name })
      } catch { /* skip */ }
    }
    setPhotos((prev) => [...prev, ...next])
  }

  function removePhoto(i: number) {
    setPhotos((prev) => prev.filter((_, idx) => idx !== i))
  }

  function buildPdfData(): EstimatePdfData {
    return {
      docType, docNumber, date,
      customerName, customerPhone, customerEmail, serviceAddress, technicianName,
      lineItems: items.map((i) => ({
        name: i.name, description: i.description,
        quantity: Number(i.quantity) || 0, price: Number(i.price) || 0,
      })),
      subtotal, taxPercent: Number(taxPercent) || 0, taxAmount,
      discount: Number(discount) || 0, total,
      depositPaid: Number(depositPaid) || 0, balanceDue,
      notes, paymentInstructions,
      photos: photos.map(({ dataUrl, width, height }) => ({ dataUrl, width, height })),
    }
  }

  async function onPreview() {
    setSendErr(null)
    try {
      const doc = await generateEstimatePdf(buildPdfData())
      const blob = doc.output('blob')
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    } catch (err) {
      setSendErr(err instanceof Error ? err.message : 'Preview failed')
    }
  }

  async function onDownload() {
    setSendErr(null)
    try {
      const doc = await generateEstimatePdf(buildPdfData())
      doc.save(`${docNumber || 'document'}.pdf`)
    } catch (err) {
      setSendErr(err instanceof Error ? err.message : 'Download failed')
    }
  }

  async function loadSaved() {
    try {
      const res = await listSaved({ data: { passcode } })
      setSavedItems(res.items)
    } catch { /* ignore */ }
  }

  function duplicateFromSaved(item: any) {
    const nextType: DocType = item.doc_type === 'invoice' ? 'invoice' : 'estimate'
    setDocType(nextType)
    setDocNumber(defaultNumber(nextType))
    setDate(todayISO())
    setCustomerName(item.customer_name ?? '')
    setCustomerPhone(item.customer_phone ?? '')
    setCustomerEmail(item.customer_email ?? '')
    setServiceAddress(item.service_address ?? '')
    setTechnicianName('')
    // Line items are not stored on saved records — reconstruct a single
    // line item with the saved total so the amount is preserved.
    const totalAmount = Number(item.total ?? 0)
    setItems([{ name: 'Services rendered', description: '', quantity: 1, price: totalAmount }])
    setTaxPercent(0)
    setDiscount(0)
    const balance = Number(item.balance_due ?? totalAmount)
    setDepositPaid(Math.max(0, totalAmount - balance))
    setNotes('')
    setPhotos([])
    setSendMsg(`Loaded ${item.doc_number} into form — edit and resend.`)
    setSendErr(null)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    setUnlockError(null)
    if (!passcode) return
    try {
      const res = await listSaved({ data: { passcode } })
      setSavedItems(res.items)
      setUnlocked(true)
    } catch (err) {
      setUnlockError(err instanceof Error ? err.message : 'Invalid passcode')
    }
  }

  async function onSend(e: React.FormEvent) {
    e.preventDefault()
    setSendMsg(null)
    setSendErr(null)
    if (!customerEmail) { setSendErr('Customer email is required to send.'); return }
    if (photos.length > 12) {
      setSendErr('Too many photos (max 12). Remove some and try again.')
      return
    }
    setSending(true)
    try {
      const pdfData = buildPdfData()
      setSendMsg('Building PDF…')
      const pdf = await generateEstimatePdf(pdfData)
      // Convert via ArrayBuffer + chunked base64 — much faster and avoids
      // freezing the tab on large PDFs vs. output('datauristring').
      const buf = pdf.output('arraybuffer') as ArrayBuffer
      const pdfBase64 = arrayBufferToBase64(buf)
      const sizeMb = (buf.byteLength / (1024 * 1024)).toFixed(1)
      if (buf.byteLength > 15 * 1024 * 1024) {
        setSending(false)
        setSendMsg(null)
        setSendErr(`PDF is too large (${sizeMb} MB). Remove some photos and try again.`)
        return
      }
      setSendMsg(`Uploading & sending (${sizeMb} MB)…`)
      const { photos: _omit, ...docForEmail } = pdfData
      // Hard timeout so the button can never hang forever.
      const res = await withTimeout(
        send({ data: {
          passcode,
          recipientEmail: customerEmail,
          doc: docForEmail as any,
          pdfBase64,
        } }),
        90_000,
        'The send request timed out. Please try again with fewer/smaller photos.',
      )
      if (res.success) setSendMsg(`Sent to ${customerEmail}.`)
      else setSendErr(`Not sent: ${res.reason ?? 'unknown reason'}`)
      await loadSaved()
    } catch (err) {
      setSendMsg(null)
      setSendErr(err instanceof Error ? err.message : 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-background text-foreground px-4 py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Estimates & Invoices</h1>
          <p className="text-muted-foreground mb-6">Internal tool — admin access only.</p>
          <form onSubmit={unlock} className="flex gap-2">
            <Input
              type="password" placeholder="Admin passcode" value={passcode}
              onChange={(e) => setPasscode(e.target.value)} autoFocus
            />
            <Button type="submit" disabled={!passcode}>Unlock</Button>
          </form>
          {unlockError && <p className="text-destructive mt-3 text-sm">{unlockError}</p>}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Estimates & Invoices</h1>
            <p className="text-muted-foreground text-sm">Create and email a branded {docType} to a customer.</p>
          </div>
          <div className="inline-flex rounded-md border overflow-hidden">
            <button
              type="button"
              onClick={() => changeDocType('estimate')}
              className={`px-4 py-2 text-sm font-semibold ${docType === 'estimate' ? 'bg-foreground text-background' : 'bg-background'}`}
            >Estimate</button>
            <button
              type="button"
              onClick={() => changeDocType('invoice')}
              className={`px-4 py-2 text-sm font-semibold border-l ${docType === 'invoice' ? 'bg-foreground text-background' : 'bg-background'}`}
            >Invoice</button>
          </div>
        </div>

        <form onSubmit={onSend} className="space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={`${docType === 'invoice' ? 'Invoice' : 'Estimate'} number`}>
              <Input value={docNumber} onChange={(e) => setDocNumber(e.target.value)} />
            </Field>
            <Field label="Date">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Technician name">
              <Input value={technicianName} onChange={(e) => setTechnicianName(e.target.value)} />
            </Field>
            <div />
            <Field label="Customer name">
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </Field>
            <Field label="Customer phone">
              <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            </Field>
            <Field label="Customer email">
              <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
            </Field>
            <Field label="Service address">
              <Input value={serviceAddress} onChange={(e) => setServiceAddress(e.target.value)} />
            </Field>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Line items</h2>
              <Button type="button" size="sm" variant="outline" onClick={addItem}>
                <Plus className="w-4 h-4 mr-1" /> Add item
              </Button>
            </div>
            <div className="space-y-3">
              {items.map((it, i) => (
                <div key={i} className="border rounded-md p-3 grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-12 md:col-span-4">
                    <Label className="text-xs">Item name</Label>
                    <Input
                      list="estimate-preset-names"
                      placeholder="Type or pick a preset…"
                      value={it.name}
                      onChange={(e) => onItemNameChange(i, e.target.value)}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      rows={2}
                      value={it.description ?? ''}
                      onChange={(e) => updateItem(i, { description: e.target.value })}
                    />
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <Label className="text-xs">Qty</Label>
                    <Input type="number" min={0} step="1" value={it.quantity}
                      onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-5 md:col-span-2">
                    <Label className="text-xs">Price ($)</Label>
                    <Input type="number" min={0} step="0.01" value={it.price}
                      onChange={(e) => updateItem(i, { price: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-3 md:col-span-1 flex md:justify-end pt-5">
                    <Button type="button" variant="ghost" size="icon"
                      onClick={() => removeItem(i)} disabled={items.length === 1}
                      aria-label="Remove item">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <datalist id="estimate-preset-names">
              {ESTIMATE_PRESETS.map((p) => (
                <option key={p.name} value={p.name} />
              ))}
            </datalist>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Tax (%)">
              <Input type="number" min={0} step="0.01" value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value))} />
            </Field>
            <Field label="Discount ($)">
              <Input type="number" min={0} step="0.01" value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))} />
            </Field>
            <Field label="Deposit paid ($)">
              <Input type="number" min={0} step="0.01" value={depositPaid}
                onChange={(e) => setDepositPaid(Number(e.target.value))} />
            </Field>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-semibold">Project photos</h2>
                <p className="text-xs text-muted-foreground">Added to a "Project Photos" section in the PDF.</p>
              </div>
              <label className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md cursor-pointer hover:bg-muted">
                <ImagePlus className="w-4 h-4" /> Add photos
                <input type="file" accept="image/*" multiple className="hidden"
                  onChange={(e) => { onAddPhotos(e.target.files); e.currentTarget.value = '' }} />
              </label>
            </div>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {photos.map((p, i) => (
                  <div key={i} className="relative group border rounded-md overflow-hidden aspect-square bg-muted">
                    <img src={p.dataUrl} alt={p.name} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-background/90 rounded p-1 opacity-0 group-hover:opacity-100"
                      aria-label="Remove photo">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-md border p-4 bg-muted/40">
            <Row label="Subtotal" value={subtotal} />
            {discount > 0 && <Row label="Discount" value={-discount} />}
            {taxAmount > 0 && <Row label={`Tax (${taxPercent}%)`} value={taxAmount} />}
            <Row label="Total" value={total} bold />
            {depositPaid > 0 && <Row label="Deposit paid" value={-depositPaid} />}
            <Row label="Balance due" value={balanceDue} bold highlight />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Notes / terms">
              <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
            <Field label="Payment instructions">
              <Textarea rows={4} value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)} />
            </Field>
          </section>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onPreview}>
              <Eye className="w-4 h-4 mr-2" /> Preview PDF
            </Button>
            <Button type="button" variant="outline" onClick={onDownload}>
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
            <Button type="submit" disabled={sending} size="lg">
              <Send className="w-4 h-4 mr-2" />
              {sending ? 'Sending…' : `Send ${docType === 'invoice' ? 'invoice' : 'estimate'} to customer`}
            </Button>
            {sendMsg && <p className="text-sm text-green-600">{sendMsg}</p>}
            {sendErr && <p className="text-sm text-destructive">{sendErr}</p>}
          </div>
        </form>

        <SavedList items={savedItems} onRefresh={loadSaved} onDuplicate={duplicateFromSaved} />
      </div>
    </main>
  )
}

function SavedList({ items, onRefresh, onDuplicate }: { items: any[]; onRefresh: () => void; onDuplicate: (item: any) => void }) {
  return (
    <section className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Saved estimates & invoices</h2>
        <Button type="button" variant="outline" size="sm" onClick={onRefresh}>Refresh</Button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No saved documents yet.</p>
      ) : (
        <div className="border rounded-md divide-y">
          {items.map((it) => (
            <div key={it.id} className="p-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted">{it.doc_type}</span>
              <span className="font-semibold">{it.doc_number}</span>
              <span>{it.customer_name || '—'}</span>
              <span className="text-muted-foreground">{it.sent_to ?? 'not emailed'}</span>
              <span className="ml-auto font-semibold">${Number(it.total ?? 0).toFixed(2)}</span>
              {it.signedUrl && (
                <a href={it.signedUrl} target="_blank" rel="noreferrer"
                  className="text-xs px-2 py-1 rounded bg-foreground text-background">Open PDF</a>
              )}
              <button
                type="button"
                onClick={() => onDuplicate(it)}
                className="text-xs px-2 py-1 rounded border inline-flex items-center gap-1 hover:bg-muted"
                title="Load into the form to edit and resend"
              >
                <Copy className="w-3 h-3" /> Duplicate & edit
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  )
}

function Row({ label, value, bold, highlight }: { label: string; value: number; bold?: boolean; highlight?: boolean }) {
  return (
    <div className={`flex justify-between py-1 ${highlight ? 'bg-yellow-300/60 px-2 rounded' : ''} ${bold ? 'font-bold text-base' : 'text-sm'}`}>
      <span>{label}</span>
      <span>${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </div>
  )
}