import * as React from 'react'
import { createServerFn } from '@tanstack/react-start'
import type { EstimateInvoiceProps } from '@/lib/email-templates/estimate-invoice'

export type SendEstimateInput = {
  passcode: string
  recipientEmail: string
  doc: EstimateInvoiceProps
  pdfBase64: string
  savePdf?: boolean
  sendEmail?: boolean
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const sendEstimateAdmin = createServerFn({ method: 'POST' })
  .inputValidator((input: SendEstimateInput) => input)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_LEADS_PASSCODE
    if (!expected) throw new Error('Admin passcode not configured')
    if (!data.passcode || data.passcode !== expected) throw new Error('Invalid passcode')
    const sendEmail = data.sendEmail !== false
    if (sendEmail && (!data.recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.recipientEmail))) {
      throw new Error('Valid recipient email is required')
    }
    if (!data.pdfBase64) throw new Error('Missing PDF data')

    // Extract raw base64 bytes from a data URI or plain base64 string.
    const afterComma = data.pdfBase64.includes(',') ? data.pdfBase64.split(',').slice(1).join(',') : data.pdfBase64
    const b64 = afterComma.replace(/\s/g, '')
    if (!b64) throw new Error('PDF data is empty')
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(b64)) throw new Error('PDF data is not valid base64')
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))

    const { render } = await import('@react-email/components')
    const { template } = await import('@/lib/email-templates/estimate-invoice')
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

    const messageId = crypto.randomUUID()
    const recipient = data.recipientEmail.trim()
    const normalized = recipient.toLowerCase()
    const templateName = 'estimate-invoice'

    // ---- Upload PDF to private storage ----
    const safeNum = (data.doc.docNumber || messageId).replace(/[^a-zA-Z0-9_-]/g, '_')
    const folder = data.doc.docType === 'invoice' ? 'invoices' : 'estimates'
    const pdfPath = `${folder}/${safeNum}-${messageId}.pdf`
    const { error: upErr } = await supabaseAdmin.storage
      .from('estimates')
      .upload(pdfPath, bytes, { contentType: 'application/pdf', upsert: false })
    if (upErr) throw new Error(`Failed to upload PDF: ${upErr.message}`)

    // 30-day signed URL for customer download
    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from('estimates').createSignedUrl(pdfPath, 60 * 60 * 24 * 30)
    if (signErr || !signed) throw new Error('Failed to create download link')
    const pdfUrl = signed.signedUrl

    // Save record in admin area
    await supabaseAdmin.from('estimates').insert({
      doc_type: data.doc.docType ?? 'estimate',
      doc_number: data.doc.docNumber ?? '',
      customer_name: data.doc.customerName,
      customer_email: data.doc.customerEmail,
      customer_phone: data.doc.customerPhone,
      service_address: data.doc.serviceAddress,
      total: data.doc.total ?? 0,
      balance_due: data.doc.balanceDue ?? 0,
      pdf_path: pdfPath,
      sent_to: sendEmail ? recipient : null,
      message_id: messageId,
    })

    if (!sendEmail) return { success: true, queued: false, messageId, pdfPath }

    // Suppression check
    const { data: suppressed } = await supabaseAdmin
      .from('suppressed_emails').select('id').eq('email', normalized).maybeSingle()
    if (suppressed) {
      return { success: false, reason: 'email_suppressed' as const, pdfPath }
    }

    // Unsubscribe token (reuse or create)
    let unsubscribeToken: string
    const { data: existing } = await supabaseAdmin
      .from('email_unsubscribe_tokens').select('token, used_at').eq('email', normalized).maybeSingle()
    if (existing && !existing.used_at) {
      unsubscribeToken = existing.token
    } else {
      const newToken = generateToken()
      await supabaseAdmin.from('email_unsubscribe_tokens').upsert(
        { token: newToken, email: normalized },
        { onConflict: 'email', ignoreDuplicates: true },
      )
      const { data: stored } = await supabaseAdmin
        .from('email_unsubscribe_tokens').select('token').eq('email', normalized).maybeSingle()
      unsubscribeToken = stored?.token ?? newToken
    }

    const docWithUrl = { ...data.doc, pdfUrl }
    const element = React.createElement(template.component, docWithUrl as any)
    const html = await render(element)
    const text = await render(element, { plainText: true })
    const subject = typeof template.subject === 'function'
      ? template.subject(docWithUrl as any)
      : template.subject

    await supabaseAdmin.from('email_send_log').insert({
      message_id: messageId, template_name: templateName, recipient_email: recipient, status: 'pending',
    })

    const SENDER_DOMAIN = 'notify.chimcrew.com'
    const FROM_DOMAIN = 'notify.chimcrew.com'
    const SITE_NAME = 'ChimCrew'

    const { error: enqueueError } = await supabaseAdmin.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: recipient,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: 'transactional',
        label: templateName,
        idempotency_key: messageId,
        unsubscribe_token: unsubscribeToken,
        queued_at: new Date().toISOString(),
      },
    })

    if (enqueueError) {
      await supabaseAdmin.from('email_send_log').insert({
        message_id: messageId, template_name: templateName, recipient_email: recipient,
        status: 'failed', error_message: 'Failed to enqueue email',
      })
      throw new Error('Failed to enqueue email')
    }

    return { success: true, queued: true, messageId, pdfPath }
  })

export const listEstimatesAdmin = createServerFn({ method: 'POST' })
  .inputValidator((input: { passcode: string }) => input)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_LEADS_PASSCODE
    if (!expected || data.passcode !== expected) throw new Error('Invalid passcode')
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
    const { data: rows } = await supabaseAdmin
      .from('estimates').select('*').order('created_at', { ascending: false }).limit(100)
    const withUrls = await Promise.all((rows ?? []).map(async (r) => {
      const { data: s } = await supabaseAdmin.storage
        .from('estimates').createSignedUrl(r.pdf_path, 60 * 60 * 24 * 7)
      return { ...r, signedUrl: s?.signedUrl ?? null }
    }))
    return { items: withUrls }
  })