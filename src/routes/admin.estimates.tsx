import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { sendEstimateAdmin } from '@/lib/admin-estimates.functions'
import type { LineItem } from '@/lib/email-templates/estimate-invoice'
import { Trash2, Plus } from 'lucide-react'

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

function defaultNumber(t: DocType) {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(Math.random() * 900 + 100)
  return `${t === 'invoice' ? 'INV' : 'EST'}-${stamp}-${rand}`
}

function AdminEstimatesPage() {
  const send = useServerFn(sendEstimateAdmin)

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
  function addItem() {
    setItems((prev) => [...prev, { name: '', description: '', quantity: 1, price: 0 }])
  }
  function removeItem(i: number) {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)))
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    setUnlockError(null)
    if (!passcode) return
    // Lightweight unlock — actual auth happens on send. We just gate the UI.
    setUnlocked(true)
  }

  async function onSend(e: React.FormEvent) {
    e.preventDefault()
    setSendMsg(null)
    setSendErr(null)
    if (!customerEmail) { setSendErr('Customer email is required to send.'); return }
    setSending(true)
    try {
      const res = await send({ data: {
        passcode,
        recipientEmail: customerEmail,
        doc: {
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
        },
      } })
      if (res.success) setSendMsg(`Sent to ${customerEmail}.`)
      else setSendErr(`Not sent: ${res.reason ?? 'unknown reason'}`)
    } catch (err) {
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
                    <Input value={it.name} onChange={(e) => updateItem(i, { name: e.target.value })} />
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <Label className="text-xs">Description</Label>
                    <Input value={it.description ?? ''} onChange={(e) => updateItem(i, { description: e.target.value })} />
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
            <Button type="submit" disabled={sending} size="lg">
              {sending ? 'Sending…' : `Send ${docType === 'invoice' ? 'invoice' : 'estimate'} to customer`}
            </Button>
            {sendMsg && <p className="text-sm text-green-600">{sendMsg}</p>}
            {sendErr && <p className="text-sm text-destructive">{sendErr}</p>}
          </div>
        </form>
      </div>
    </main>
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