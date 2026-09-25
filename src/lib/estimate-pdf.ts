import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoUrl from '@/assets/chimcrew-logo-transparent.png'

export interface PdfLineItem {
  name: string
  description?: string
  quantity: number
  price: number
}

export interface EstimatePdfData {
  docType: 'estimate' | 'invoice'
  docNumber: string
  date: string
  customerName: string
  customerPhone: string
  customerEmail: string
  serviceAddress: string
  technicianName: string
  lineItems: PdfLineItem[]
  subtotal: number
  taxPercent: number
  taxAmount: number
  discount: number
  total: number
  depositPaid: number
  balanceDue: number
  notes: string
  paymentInstructions: string
  photos: { dataUrl: string; width: number; height: number }[]
}

const BRAND_YELLOW: [number, number, number] = [250, 204, 21]
const BRAND_BLACK: [number, number, number] = [17, 17, 17]
const MUTED: [number, number, number] = [110, 110, 110]
const BORDER: [number, number, number] = [220, 220, 220]

const COMPANY = {
  name: 'ChimCrew',
  tagline: 'Columbus Chimney & Fireplace Specialists',
  phone: '(614) 683-5763',
  email: 'office@chimcrew.com',
  website: 'chimcrew.com',
  address: '220 Vine Street, Columbus, OH 43215',
}

const TERMS_TITLE = 'Terms and Conditions'
const TERMS_BODY = `Agreement and Acknowledgment
By paying the due balance on invoices provided, the Client acknowledges that all requested service items listed on the invoice have been completed and tested to their satisfaction, unless otherwise specified. Labor charges will still apply for partial or unsuccessful repairs where work was performed. By accepting this invoice, the Client agrees to pay in full the amount listed in the "Total" section.

Scope of Terms
These Terms govern the products and services provided by Chimcrew ("Chimcrew") and apply to all Quotes and work orders. Any different or additional terms provided by the Customer are expressly rejected unless agreed to in writing. If a separate agreement has been signed by both parties, that agreement shall take precedence.

Payment
Customer agrees to pay the full amount set forth in the Quote or invoice, including applicable taxes. Payments are due upon completion unless otherwise agreed. A valid credit card or Zelle information must be provided upon acceptance of the Quote. Returned checks incur a $35.00 fee. Any account unpaid after 28 days may be referred to collections, and Customer agrees to reimburse all collection-related costs, including attorney fees.

Taxes
Customer is responsible for all sales, use, and other applicable taxes or charges imposed by any government authority on amounts payable.

Change Orders
Any modification to the agreed-upon Quote or timeline must be documented and approved in writing through a Change Order. Both parties agree to act promptly and in good faith regarding any requested changes.

Job Approval and Satisfaction
Before finalizing any job, the Client will have an opportunity to inspect the completed work. By signing off on or verbally approving the completion of services, the Client confirms satisfaction with the results and waives the right to future disputes related to workmanship or service quality, except as provided under the limited warranty terms below.

Corrections and Right to Remedy
If the Client believes that part of the work was not completed properly, they must notify Chimcrew immediately upon discovery. Chimcrew must be given the opportunity to inspect and correct the issue. The Client agrees to allow up to three (3) reasonable attempts to fix or redo the work before requesting a refund or initiating a dispute. Failure to follow this process may forfeit the Client's right to dispute or claim a refund.

Deposits and Cancellation Policy
For all jobs requiring a deposit, particularly those involving custom orders or materials, a minimum 30% cancellation fee applies. This fee covers materials, logistics, and administrative costs. No refunds or cancellations are permitted once the job has been completed and approved by the Client.

Cleaning Results and Hidden Conditions
Client acknowledges that certain stains, odors, and damages may not be fully removed despite reasonable effort. No guarantees are made beyond what is stated in writing. Chimcrew is not liable for issues caused by hidden or latent defects, nor can we guarantee an exact match of textures or colors when replacing or repairing materials.

Limited Warranty
Chimcrew warrants that services will be performed professionally and in accordance with industry standards. Warranty claims must be submitted in writing within 12 months of service. Chimcrew, at its discretion, will (i) repair/re-perform the service or (ii) issue a pro-rated refund. This remedy is exclusive and limited to the original invoice amount. Chimcrew makes no warranty for third-party products. Any manufacturer warranties will be passed to the Customer when possible.

No Other Warranties
Other than the warranty stated above, Chimcrew disclaims all other express or implied warranties, including merchantability, fitness for a particular purpose, and non-infringement.

Limitation of Liability
In no event shall Chimcrew be liable for indirect, incidental, or consequential damages. Total liability shall not exceed the amount paid by the Customer within the 12-month period prior to the event giving rise to the claim.

Dispute Resolution
All complaints must be submitted in writing within seven (7) days of substantial completion. Chimcrew must be allowed to inspect and remedy any issue. Arbitration under the American Arbitration Association's Construction Industry Rules will be the exclusive method for resolving disputes, except for cases involving non-payment, which may be pursued in court.

Stored Payment Authorization
If Chimcrew collected an initial deposit using a credit or debit card kept on file, the Company is authorized to charge the remaining balance to the same card upon job completion, unless the Customer provides written notice via email requesting a different payment method prior to the final charge.

Card Processing Fee
All payments made by credit or debit card are subject to a 3.5% processing fee to cover third-party transaction costs. This fee applies to all card types, including credit and debit cards, and will be added automatically to the total amount charged. Customers may avoid this fee by paying via Zelle or check.

Entire Agreement
These Terms, along with any accepted Quotes or work orders, represent the entire agreement between the parties and supersede all prior negotiations or representations.`

const fmt = (n: number) =>
  `$${(Number.isFinite(n) ? n : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

let cachedLogo: { dataUrl: string; w: number; h: number } | null = null
async function getLogo() {
  if (cachedLogo) return cachedLogo
  const res = await fetch(logoUrl)
  const blob = await res.blob()
  const dataUrl: string = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(i)
    i.onerror = reject
    i.src = dataUrl
  })
  cachedLogo = { dataUrl, w: img.naturalWidth, h: img.naturalHeight }
  return cachedLogo
}

export async function fileToPhoto(file: File): Promise<{ dataUrl: string; width: number; height: number }> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = reject
    r.readAsDataURL(file)
  })
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(i)
    i.onerror = reject
    i.src = dataUrl
  })
  // Downscale large photos aggressively to keep PDF size small
  // (large PDFs cause the browser/network to hang on send).
  const MAX = 1100
  let w = img.naturalWidth, h = img.naturalHeight
  if (Math.max(w, h) > MAX) {
    const s = MAX / Math.max(w, h)
    w = Math.round(w * s); h = Math.round(h * s)
  }
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, w, h)
  const out = canvas.toDataURL('image/jpeg', 0.72)
  return { dataUrl: out, width: w, height: h }
}

export async function generateEstimatePdf(data: EstimatePdfData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 40
  const label = data.docType === 'invoice' ? 'INVOICE' : 'ESTIMATE'

  // ── Header bar ──
  doc.setFillColor(...BRAND_BLACK)
  doc.rect(0, 0, pageW, 96, 'F')
  doc.setFillColor(...BRAND_YELLOW)
  doc.rect(0, 96, pageW, 6, 'F')

  try {
    const logo = await getLogo()
    const targetH = 64
    const targetW = (logo.w / logo.h) * targetH
    doc.addImage(logo.dataUrl, 'PNG', margin, 16, targetW, targetH)
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(255, 255, 255)
    doc.text(COMPANY.address, margin + targetW + 12, 42)
    doc.text(`Phone: ${COMPANY.phone}`, margin + targetW + 12, 56)
    doc.text(COMPANY.website, margin + targetW + 12, 70)
  } catch {
    doc.setTextColor(...BRAND_YELLOW)
    doc.setFont('helvetica', 'bold').setFontSize(28)
    doc.text('CHIMCREW', margin, 58)
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(255, 255, 255)
    doc.text(COMPANY.address, margin, 78)
  }

  doc.setTextColor(...BRAND_YELLOW)
  doc.setFont('helvetica', 'bold').setFontSize(26)
  doc.text(label, pageW - margin, 50, { align: 'right' })
  doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor(255, 255, 255)
  doc.text(`#${data.docNumber}`, pageW - margin, 70, { align: 'right' })
  doc.text(data.date, pageW - margin, 84, { align: 'right' })

  // ── Company / Customer block ──
  let y = 130
  doc.setTextColor(...BRAND_BLACK).setFont('helvetica', 'bold').setFontSize(10)
  doc.text('FROM', margin, y)
  doc.text('BILL TO', pageW / 2, y)
  doc.setFont('helvetica', 'normal').setFontSize(10)
  y += 14
  const fromLines = [COMPANY.name, COMPANY.tagline, COMPANY.address, `Phone: ${COMPANY.phone}`, `Email: ${COMPANY.email}`, COMPANY.website]
  const toLines = [
    data.customerName || '—',
    data.serviceAddress,
    data.customerPhone && `Phone: ${data.customerPhone}`,
    data.customerEmail && `Email: ${data.customerEmail}`,
    data.technicianName && `Technician: ${data.technicianName}`,
  ].filter(Boolean) as string[]
  const blockTop = y
  fromLines.forEach((l, i) => doc.text(l, margin, blockTop + i * 13))
  toLines.forEach((l, i) => doc.text(l, pageW / 2, blockTop + i * 13))
  y = blockTop + Math.max(fromLines.length, toLines.length) * 13 + 14

  // ── Line items table ──
  autoTable(doc, {
    startY: y,
    head: [['Item', 'Description', 'Qty', 'Price', 'Total']],
    body: data.lineItems.map((i) => [
      i.name,
      i.description || '',
      String(i.quantity),
      fmt(i.price),
      fmt((Number(i.quantity) || 0) * (Number(i.price) || 0)),
    ]),
    margin: { left: margin, right: margin },
    styles: { fontSize: 10, cellPadding: 6, lineColor: BORDER, lineWidth: 0.5 },
    headStyles: { fillColor: BRAND_BLACK, textColor: BRAND_YELLOW, fontStyle: 'bold' },
    columnStyles: {
      2: { halign: 'right', cellWidth: 40 },
      3: { halign: 'right', cellWidth: 70 },
      4: { halign: 'right', cellWidth: 80 },
    },
  })
  y = (doc as any).lastAutoTable.finalY + 16

  // ── Totals ──
  const totalsX = pageW - margin - 220
  const totalsW = 220
  const row = (label: string, value: string, bold = false, highlight = false) => {
    if (highlight) {
      doc.setFillColor(...BRAND_YELLOW)
      doc.rect(totalsX, y - 12, totalsW, 22, 'F')
    }
    doc.setFont('helvetica', bold ? 'bold' : 'normal').setFontSize(bold ? 12 : 10)
    doc.setTextColor(...BRAND_BLACK)
    doc.text(label, totalsX + 8, y + 3)
    doc.text(value, totalsX + totalsW - 8, y + 3, { align: 'right' })
    y += bold ? 22 : 18
  }
  row('Subtotal', fmt(data.subtotal))
  if (data.discount > 0) row('Discount', `-${fmt(data.discount)}`)
  if (data.taxAmount > 0) row(`Tax (${data.taxPercent}%)`, fmt(data.taxAmount))
  row('Total', fmt(data.total), true)
  if (data.depositPaid > 0) row('Deposit paid', `-${fmt(data.depositPaid)}`)
  row('Balance Due', fmt(data.balanceDue), true, true)
  y += 8

  const ensureSpace = (need: number) => {
    if (y + need > pageH - 60) { doc.addPage(); y = margin }
  }

  // ── Notes / Payment instructions ──
  const writeBlock = (title: string, body: string) => {
    if (!body.trim()) return
    ensureSpace(60)
    doc.setFont('helvetica', 'bold').setFontSize(11).setTextColor(...BRAND_BLACK)
    doc.text(title, margin, y); y += 14
    doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor(...MUTED)
    const lines = doc.splitTextToSize(body, pageW - margin * 2)
    for (const line of lines) { ensureSpace(14); doc.text(line, margin, y); y += 13 }
    y += 8
    doc.setTextColor(...BRAND_BLACK)
  }
  writeBlock('Notes', data.notes)
  writeBlock('Payment Instructions', data.paymentInstructions)

  // ── Signature (estimate only) ──
  if (data.docType === 'estimate') {
    ensureSpace(140)
    doc.setDrawColor(...BORDER).setLineWidth(0.5)
    doc.line(margin, y, pageW - margin, y); y += 16
    doc.setFont('helvetica', 'bold').setFontSize(12).setTextColor(...BRAND_BLACK)
    doc.text('Customer Approval Signature', margin, y); y += 16
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...MUTED)
    const intro = 'By signing, customer approves the scope of work and pricing listed in this estimate.'
    doc.splitTextToSize(intro, pageW - margin * 2).forEach((l: string) => { doc.text(l, margin, y); y += 12 })
    y += 14
    doc.setTextColor(...BRAND_BLACK).setFontSize(10)
    // Printed name
    doc.text('Printed Name:', margin, y)
    doc.line(margin + 90, y + 2, pageW / 2 - 10, y + 2)
    // Date
    doc.text('Date:', pageW / 2 + 10, y)
    doc.line(pageW / 2 + 50, y + 2, pageW - margin, y + 2)
    y += 36
    // Signature line
    doc.text('Signature:', margin, y)
    doc.line(margin + 70, y + 2, pageW - margin, y + 2)
    y += 24
  }

  // ── Project Photos ──
  if (data.photos.length > 0) {
    doc.addPage(); y = margin
    doc.setFont('helvetica', 'bold').setFontSize(16).setTextColor(...BRAND_BLACK)
    doc.text('Project Photos', margin, y); y += 8
    doc.setDrawColor(...BRAND_YELLOW).setLineWidth(2)
    doc.line(margin, y, margin + 80, y); y += 18

    const gap = 12
    const cols = 2
    const colW = (pageW - margin * 2 - gap * (cols - 1)) / cols
    const rowH = 180
    let col = 0
    for (const p of data.photos) {
      if (y + rowH > pageH - margin) { doc.addPage(); y = margin }
      const x = margin + col * (colW + gap)
      // contain image inside colW x rowH
      const ratio = p.width / p.height
      let w = colW, h = colW / ratio
      if (h > rowH) { h = rowH; w = rowH * ratio }
      const xOff = x + (colW - w) / 2
      const yOff = y + (rowH - h) / 2
      doc.setFillColor(245, 245, 245)
      doc.rect(x, y, colW, rowH, 'F')
      try { doc.addImage(p.dataUrl, 'JPEG', xOff, yOff, w, h) } catch { /* skip bad image */ }
      col++
      if (col >= cols) { col = 0; y += rowH + gap }
    }
    if (col !== 0) y += rowH + gap
  }

  // ── Terms & Conditions (always on new page) ──
  doc.addPage(); y = margin
  doc.setFont('helvetica', 'bold').setFontSize(16).setTextColor(...BRAND_BLACK)
  doc.text(TERMS_TITLE, margin, y); y += 8
  doc.setDrawColor(...BRAND_YELLOW).setLineWidth(2)
  doc.line(margin, y, margin + 80, y); y += 16
  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(60, 60, 60)
  const paras = TERMS_BODY.split('\n\n')
  for (const p of paras) {
    const [first, ...rest] = p.split('\n')
    ensureSpace(40)
    doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(...BRAND_BLACK)
    doc.text(first, margin, y); y += 12
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(60, 60, 60)
    const body = rest.join(' ')
    const lines = doc.splitTextToSize(body, pageW - margin * 2)
    for (const line of lines) { ensureSpace(12); doc.text(line, margin, y); y += 11 }
    y += 8
  }

  // ── Footer on every page ──
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setDrawColor(...BORDER).setLineWidth(0.5)
    doc.line(margin, pageH - 40, pageW - margin, pageH - 40)
    doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor(...MUTED)
    doc.text(`${COMPANY.name} · ${COMPANY.phone} · ${COMPANY.website}`, margin, pageH - 26)
    doc.text(`Page ${i} of ${pageCount}`, pageW - margin, pageH - 26, { align: 'right' })
  }

  return doc
}