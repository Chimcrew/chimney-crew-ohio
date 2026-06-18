import { createServerFn } from '@tanstack/react-start'

export type AdminLead = {
  id: string
  created_at: string
  source: string | null
  name: string | null
  phone: string | null
  email: string | null
  service: string | null
  city: string | null
  address: string | null
  preferred_date: string | null
  time_window: string | null
  notes: string | null
}

export const listLeadsAdmin = createServerFn({ method: 'POST' })
  .inputValidator((input: { passcode: string }) => input)
  .handler(async ({ data }): Promise<{ leads: AdminLead[] }> => {
    const expected = process.env.ADMIN_LEADS_PASSCODE
    if (!expected) throw new Error('Admin passcode not configured')
    if (!data.passcode || data.passcode !== expected) {
      throw new Error('Invalid passcode')
    }
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
    const { data: rows, error } = await supabaseAdmin
      .from('leads')
      .select('id, created_at, source, name, phone, email, service, city, address, preferred_date, time_window, notes')
      .order('created_at', { ascending: false })
      .limit(500)
    if (error) throw new Error(error.message)
    return { leads: (rows ?? []) as AdminLead[] }
  })