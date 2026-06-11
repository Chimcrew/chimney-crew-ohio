import * as React from 'react'
import { render } from '@react-email/render'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'ChimCrew'
const SENDER_DOMAIN = 'notify.chimcrew.com'
const FROM_DOMAIN = 'notify.chimcrew.com'
const TEMPLATE_NAME = 'new-lead-notification'

const ADMIN_EMAILS = [
  'office@chimcrew.com',
]

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function getOrCreateUnsubscribeToken(supabase: any, email: string): Promise<string> {
  const normalized = email.toLowerCase()
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalized)
    .maybeSingle()
  if (existing && !existing.used_at) return existing.token
  const token = generateToken()
  await supabase
    .from('email_unsubscribe_tokens')
    .upsert({ token, email: normalized }, { onConflict: 'email', ignoreDuplicates: true })
  const { data: stored } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token')
    .eq('email', normalized)
    .maybeSingle()
  return stored?.token || token
}

const LeadSchema = z.object({
  source: z.string().min(1).max(100).optional(),
  name: z.string().min(1).max(200).optional(),
  phone: z.string().min(1).max(50).optional(),
  email: z.string().email().max(200).optional().or(z.literal('')),
  service: z.string().min(1).max(200).optional(),
  city: z.string().min(1).max(100).optional(),
  address: z.string().min(1).max(300).optional(),
  date: z.string().min(1).max(100).optional(),
  timeWindow: z.string().min(1).max(100).optional(),
  notes: z.string().min(1).max(2000).optional(),
})

export const Route = createFileRoute('/api/public/notify-lead')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }

        let body: any
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = LeadSchema.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid input', issues: parsed.error.issues }, { status: 400 })
        }
        const data = parsed.data

        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template) {
          return Response.json({ error: 'Template missing' }, { status: 500 })
        }

        const element = React.createElement(template.component, data)
        const html = await render(element)
        const plainText = await render(element, { plainText: true })
        const subject =
          typeof template.subject === 'function' ? template.subject(data) : template.subject

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Persist the lead so it shows up in the database even if email delivery fails later.
        const { error: insertError } = await supabase.from('leads').insert({
          source: data.source,
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          service: data.service,
          city: data.city,
          address: data.address,
          preferred_date: data.date,
          time_window: data.timeWindow,
          notes: data.notes,
        })
        if (insertError) {
          console.error('Lead insert failed', insertError)
        }

        const results = await Promise.all(
          ADMIN_EMAILS.map(async (to) => {
            const messageId = crypto.randomUUID()
            const unsubscribeToken = await getOrCreateUnsubscribeToken(supabase, to)
            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: TEMPLATE_NAME,
              recipient_email: to,
              status: 'pending',
            })
            const { error } = await supabase.rpc('enqueue_email', {
              queue_name: 'transactional_emails',
              payload: {
                message_id: messageId,
                to,
                from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
                sender_domain: SENDER_DOMAIN,
                subject,
                html,
                text: plainText,
                purpose: 'transactional',
                label: TEMPLATE_NAME,
                idempotency_key: `${TEMPLATE_NAME}-${messageId}`,
                unsubscribe_token: unsubscribeToken,
                queued_at: new Date().toISOString(),
              },
            })
            if (error) {
              console.error('Enqueue failed', { to, error })
              await supabase.from('email_send_log').insert({
                message_id: messageId,
                template_name: TEMPLATE_NAME,
                recipient_email: to,
                status: 'failed',
                error_message: error.message,
              })
              return { to, ok: false }
            }
            return { to, ok: true }
          })
        )

        return Response.json({ success: true, results })
      },
    },
  },
})