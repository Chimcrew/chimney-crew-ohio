import * as React from 'react'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const PHONE = '(614) 683-5763'

export interface LineItem {
  name: string
  description?: string
  quantity: number
  price: number
}

export interface EstimateInvoiceProps {
  docType?: 'estimate' | 'invoice'
  docNumber?: string
  date?: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  serviceAddress?: string
  technicianName?: string
  lineItems?: LineItem[]
  subtotal?: number
  taxPercent?: number
  taxAmount?: number
  discount?: number
  total?: number
  depositPaid?: number
  balanceDue?: number
  notes?: string
  paymentInstructions?: string
  pdfUrl?: string
}

const fmt = (n: number) =>
  `$${(Number.isFinite(n) ? n : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const EstimateInvoiceEmail = ({
  docType = 'estimate',
  docNumber = '',
  date = '',
  customerName = '',
  customerPhone = '',
  customerEmail = '',
  serviceAddress = '',
  technicianName = '',
  lineItems = [],
  subtotal = 0,
  taxPercent = 0,
  taxAmount = 0,
  discount = 0,
  total = 0,
  depositPaid = 0,
  balanceDue = 0,
  notes = '',
  paymentInstructions = '',
  pdfUrl,
}: EstimateInvoiceProps) => {
  const label = docType === 'invoice' ? 'INVOICE' : 'ESTIMATE'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{label} #{docNumber} from ChimCrew</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={brandBar}>
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
              <tr>
                <td style={{ verticalAlign: 'middle' }}>
                  <Text style={brandMark}>CHIMCREW</Text>
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'right' as const }}>
                  <Text style={brandTag}>{label}</Text>
                </td>
              </tr>
            </table>
          </Section>

          <Section style={metaSection}>
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
              <tr>
                <td style={{ width: '50%', verticalAlign: 'top' }}>
                  <Text style={metaLabel}>{label} #</Text>
                  <Text style={metaValue}>{docNumber || '—'}</Text>
                </td>
                <td style={{ width: '50%', verticalAlign: 'top', textAlign: 'right' as const }}>
                  <Text style={metaLabel}>Date</Text>
                  <Text style={metaValue}>{date || '—'}</Text>
                </td>
              </tr>
            </table>
          </Section>

          {pdfUrl ? (
            <Section style={{ padding: '8px 28px 16px', textAlign: 'center' as const }}>
              <Button href={pdfUrl} style={pdfBtn}>Download PDF</Button>
              <Text style={pdfHelp}>Your full {label.toLowerCase()} PDF (with photos, signature, and terms) is attached above.</Text>
            </Section>
          ) : null}

          <Section style={card}>
            <Text style={cardTitle}>Billed to</Text>
            <Text style={kv}>{customerName || '—'}</Text>
            {serviceAddress ? <Text style={kvSub}>{serviceAddress}</Text> : null}
            {customerPhone ? <Text style={kvSub}>{customerPhone}</Text> : null}
            {customerEmail ? <Text style={kvSub}>{customerEmail}</Text> : null}
            {technicianName ? (
              <>
                <Hr style={innerHr} />
                <Text style={kvSub}><span style={kvLabel}>Technician · </span>{technicianName}</Text>
              </>
            ) : null}
          </Section>

          <Section style={{ padding: '0 28px' }}>
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ borderCollapse: 'collapse' as const }}>
              <thead>
                <tr>
                  <th style={th}>Item</th>
                  <th style={{ ...th, textAlign: 'center' as const, width: '60px' }}>Qty</th>
                  <th style={{ ...th, textAlign: 'right' as const, width: '90px' }}>Price</th>
                  <th style={{ ...th, textAlign: 'right' as const, width: '100px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.length === 0 ? (
                  <tr><td colSpan={4} style={tdEmpty}>No line items.</td></tr>
                ) : (
                  lineItems.map((li, i) => (
                    <tr key={i}>
                      <td style={td}>
                        <div style={itemName}>{li.name || '—'}</div>
                        {li.description ? <div style={itemDesc}>{li.description}</div> : null}
                      </td>
                      <td style={{ ...td, textAlign: 'center' as const }}>{li.quantity}</td>
                      <td style={{ ...td, textAlign: 'right' as const }}>{fmt(li.price)}</td>
                      <td style={{ ...td, textAlign: 'right' as const }}>{fmt(li.price * li.quantity)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Section>

          <Section style={{ padding: '8px 28px 0' }}>
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
              <tr><td style={totRowL}>Subtotal</td><td style={totRowR}>{fmt(subtotal)}</td></tr>
              {discount > 0 ? <tr><td style={totRowL}>Discount</td><td style={totRowR}>− {fmt(discount)}</td></tr> : null}
              {taxAmount > 0 ? <tr><td style={totRowL}>Tax {taxPercent ? `(${taxPercent}%)` : ''}</td><td style={totRowR}>{fmt(taxAmount)}</td></tr> : null}
              <tr><td style={totGrandL}>Total</td><td style={totGrandR}>{fmt(total)}</td></tr>
              {depositPaid > 0 ? <tr><td style={totRowL}>Deposit paid</td><td style={totRowR}>− {fmt(depositPaid)}</td></tr> : null}
              <tr><td style={balL}>Balance due</td><td style={balR}>{fmt(balanceDue)}</td></tr>
            </table>
          </Section>

          {paymentInstructions ? (
            <Section style={infoBlock}>
              <Text style={infoKicker}>Payment instructions</Text>
              <Text style={infoBody}>{paymentInstructions}</Text>
            </Section>
          ) : null}

          {notes ? (
            <Section style={infoBlock}>
              <Text style={infoKicker}>Notes / terms</Text>
              <Text style={infoBody}>{notes}</Text>
            </Section>
          ) : null}

          <Hr style={hr} />
          <Text style={footer}>
            ChimCrew — CSIA-certified chimney sweeps · {PHONE} · chimcrew.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: EstimateInvoiceEmail,
  subject: (data: Record<string, any>) =>
    `ChimCrew ${data?.docType === 'invoice' ? 'Invoice' : 'Estimate'}${data?.docNumber ? ` #${data.docNumber}` : ''}`,
  displayName: 'Estimate / Invoice',
  previewData: {
    docType: 'estimate',
    docNumber: 'EST-1001',
    date: 'Jun 25, 2026',
    customerName: 'Jane Smith',
    customerPhone: '(614) 555-0199',
    customerEmail: 'jane@example.com',
    serviceAddress: '123 Main St, Columbus, OH 43215',
    technicianName: 'Mike R.',
    lineItems: [
      { name: 'Chimney sweep', description: 'Full cleaning + safety check', quantity: 1, price: 199 },
      { name: 'Chimney cap', description: 'Stainless steel, installed', quantity: 1, price: 285 },
    ],
    subtotal: 484, taxPercent: 7.5, taxAmount: 36.3, discount: 0, total: 520.3,
    depositPaid: 100, balanceDue: 420.3,
    notes: 'Estimate valid for 30 days.',
    paymentInstructions: 'Cash, check, or card accepted on completion.',
  },
} satisfies TemplateEntry

const BRAND_BLACK = '#0B0F19'
const BRAND_YELLOW = '#FACC15'
const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '0', maxWidth: '640px', margin: '0 auto' }
const brandBar = { backgroundColor: BRAND_BLACK, padding: '18px 28px', borderBottom: `4px solid ${BRAND_YELLOW}` }
const brandMark = { color: BRAND_YELLOW, fontSize: '20px', fontWeight: 800 as const, letterSpacing: '0.18em', margin: 0 }
const brandTag = { color: '#ffffff', fontSize: '12px', fontWeight: 800 as const, letterSpacing: '0.18em', margin: 0 }
const metaSection = { padding: '20px 28px 8px' }
const metaLabel = { fontSize: '11px', color: '#6b7280', fontWeight: 700 as const, letterSpacing: '0.12em', textTransform: 'uppercase' as const, margin: 0 }
const metaValue = { fontSize: '15px', color: BRAND_BLACK, fontWeight: 700 as const, margin: '2px 0 0' }
const card = { backgroundColor: '#f7f7f5', borderRadius: '10px', padding: '14px 18px', margin: '8px 28px 18px', border: '1px solid #ececec' }
const cardTitle = { fontSize: '11px', fontWeight: 800 as const, color: BRAND_BLACK, margin: '0 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.14em' }
const kv = { fontSize: '15px', color: '#1a1a1a', margin: '2px 0', fontWeight: 700 as const }
const kvSub = { fontSize: '13px', color: '#3f4756', margin: '2px 0' }
const kvLabel = { color: '#6b7280', fontWeight: 700 as const }
const innerHr = { borderColor: '#e5e5e5', margin: '10px 0' }
const th = { fontSize: '11px', color: '#6b7280', fontWeight: 800 as const, letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '10px 8px', borderBottom: `2px solid ${BRAND_BLACK}`, textAlign: 'left' as const }
const td = { fontSize: '13px', color: '#1a1a1a', padding: '10px 8px', borderBottom: '1px solid #ececec', verticalAlign: 'top' as const }
const tdEmpty = { fontSize: '13px', color: '#888', padding: '14px 8px', textAlign: 'center' as const }
const itemName = { fontWeight: 700 as const, color: BRAND_BLACK }
const itemDesc = { fontSize: '12px', color: '#6b7280', marginTop: '2px' }
const totRowL = { fontSize: '13px', color: '#3f4756', padding: '6px 8px', textAlign: 'right' as const }
const totRowR = { fontSize: '13px', color: '#1a1a1a', padding: '6px 8px', textAlign: 'right' as const, width: '110px', fontWeight: 700 as const }
const totGrandL = { fontSize: '14px', color: BRAND_BLACK, padding: '10px 8px', textAlign: 'right' as const, fontWeight: 800 as const, borderTop: '1px solid #ececec' }
const totGrandR = { fontSize: '16px', color: BRAND_BLACK, padding: '10px 8px', textAlign: 'right' as const, fontWeight: 800 as const, borderTop: '1px solid #ececec' }
const balL = { fontSize: '13px', color: BRAND_BLACK, padding: '10px 8px', textAlign: 'right' as const, fontWeight: 800 as const, backgroundColor: BRAND_YELLOW }
const balR = { fontSize: '16px', color: BRAND_BLACK, padding: '10px 8px', textAlign: 'right' as const, fontWeight: 800 as const, backgroundColor: BRAND_YELLOW }
const infoBlock = { padding: '8px 28px 0' }
const infoKicker = { fontSize: '11px', fontWeight: 800 as const, color: BRAND_BLACK, margin: '12px 0 4px', textTransform: 'uppercase' as const, letterSpacing: '0.14em' }
const infoBody = { fontSize: '13px', color: '#1a1a1a', margin: 0, lineHeight: '1.55', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#ececec', margin: '24px 28px' }
const footer = { fontSize: '12px', color: '#888', margin: '0 28px 24px', lineHeight: '1.5', textAlign: 'center' as const }