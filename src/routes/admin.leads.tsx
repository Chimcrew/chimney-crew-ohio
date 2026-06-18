import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { listLeadsAdmin, type AdminLead } from '@/lib/admin-leads.functions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/admin/leads')({
  head: () => ({ meta: [{ title: 'Lead Inbox · ChimCrew Admin' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: AdminLeadsPage,
})

function AdminLeadsPage() {
  const fetchLeads = useServerFn(listLeadsAdmin)
  const [passcode, setPasscode] = useState('')
  const [leads, setLeads] = useState<AdminLead[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchLeads({ data: { passcode } })
      setLeads(res.leads)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load leads')
      setLeads(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Lead Inbox</h1>
        <p className="text-muted-foreground mb-6">Every submission from every form on the site. Updated live.</p>

        {!leads && (
          <form
            onSubmit={(e) => { e.preventDefault(); load() }}
            className="flex gap-2 max-w-md mb-6"
          >
            <Input
              type="password"
              placeholder="Admin passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              autoFocus
            />
            <Button type="submit" disabled={loading || !passcode}>
              {loading ? 'Loading…' : 'Unlock'}
            </Button>
          </form>
        )}

        {error && <p className="text-destructive mb-4">{error}</p>}

        {leads && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{leads.length} lead{leads.length === 1 ? '' : 's'}</p>
              <Button size="sm" variant="outline" onClick={load} disabled={loading}>
                {loading ? 'Refreshing…' : 'Refresh'}
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="p-3">When</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">City / Address</th>
                    <th className="p-3">Preferred</th>
                    <th className="p-3">Source</th>
                    <th className="p-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t align-top">
                      <td className="p-3 whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                      <td className="p-3">{l.name || '—'}</td>
                      <td className="p-3 whitespace-nowrap">
                        {l.phone ? <a className="underline" href={`tel:${l.phone}`}>{l.phone}</a> : '—'}
                      </td>
                      <td className="p-3">
                        {l.email ? <a className="underline" href={`mailto:${l.email}`}>{l.email}</a> : '—'}
                      </td>
                      <td className="p-3">{l.service || '—'}</td>
                      <td className="p-3">
                        {[l.city, l.address].filter(Boolean).join(' · ') || '—'}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {[l.preferred_date, l.time_window].filter(Boolean).join(' · ') || '—'}
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">{l.source || '—'}</td>
                      <td className="p-3 max-w-xs whitespace-pre-wrap">{l.notes || '—'}</td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan={9} className="p-6 text-center text-muted-foreground">No leads yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  )
}