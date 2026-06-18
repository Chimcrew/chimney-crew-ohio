import * as React from 'react'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const PHONE = '(614) 683-5763'
const PHONE_HREF = 'tel:6146835763'

interface AppointmentConfirmedProps {
  name?: string
  service?: string
  city?: string
  date?: string
  timeWindow?: string
}

const AppointmentConfirmedEmail = ({
  name = 'there',
  service = 'Free chimney inspection',
  city = 'Columbus',
  date = '',
  timeWindow = '',
}: AppointmentConfirmedProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Appointment confirmed — see you soon.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar}>
          <Text style={brandMark}>CHIMCREW</Text>
        </Section>

        <Section style={statusPill}>
          <Text style={statusPillText}>✓ APPOINTMENT CONFIRMED</Text>
        </Section>

        <Heading style={h1}>You're all set, {name.split(' ')[0]}.</Heading>
        <Text style={subtitle}>
          Your appointment with ChimCrew is officially confirmed. A CSIA-certified tech is on the schedule for your job.
        </Text>

        <Section style={card}>
          <Text style={cardTitle}>Appointment details</Text>
          <Text style={kv}><span style={kvLabel}>Status · </span><span style={confirmed}>Confirmed</span></Text>
          <Text style={kv}><span style={kvLabel}>Service · </span>{service}</Text>
          {city ? <Text style={kv}><span style={kvLabel}>Area · </span>{city}</Text> : null}
          {date ? <Text style={kv}><span style={kvLabel}>Date · </span>{date}</Text> : null}
          {timeWindow ? <Text style={kv}><span style={kvLabel}>Window · </span>{timeWindow}</Text> : null}
        </Section>

        <Section style={whatNext}>
          <Text style={whatNextKicker}>What to expect</Text>
          <Text style={whatNextItem}>• Your tech will call 30 minutes before arrival.</Text>
          <Text style={whatNextItem}>• Full inspection report and photos delivered same day.</Text>
          <Text style={whatNextItem}>• No-pressure, upfront pricing on anything we recommend.</Text>
        </Section>

        <Text style={ctaText}>Need to reschedule or add details?</Text>
        <Button href={PHONE_HREF} style={cta}>
          Call {PHONE}
        </Button>

        <Hr style={hr} />
        <Text style={footer}>
          ChimCrew — CSIA-certified chimney sweeps serving Columbus, Cincinnati, Dayton & all of Central Ohio.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AppointmentConfirmedEmail,
  subject: (data: Record<string, any>) =>
    `✓ ChimCrew appointment confirmed${data?.name ? `, ${String(data.name).split(' ')[0]}` : ''}`,
  displayName: 'Appointment confirmed',
  previewData: {
    name: 'Jane Smith',
    service: 'Free chimney inspection',
    city: 'Columbus',
    date: 'Thu, Jun 25',
    timeWindow: '9:00 AM – 12:00 PM',
  },
} satisfies TemplateEntry

const BRAND_BLACK = '#0B0F19'
const BRAND_YELLOW = '#FACC15'
const CONFIRM_GREEN = '#15803d'

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const brandBar = { backgroundColor: BRAND_BLACK, padding: '18px 28px', borderBottom: `4px solid ${BRAND_YELLOW}` }
const brandMark = { color: BRAND_YELLOW, fontSize: '18px', fontWeight: 800 as const, letterSpacing: '0.18em', margin: 0 }
const statusPill = { margin: '22px 28px 8px' }
const statusPillText = { display: 'inline-block', backgroundColor: '#dcfce7', color: CONFIRM_GREEN, fontSize: '12px', fontWeight: 800 as const, letterSpacing: '0.12em', padding: '6px 12px', borderRadius: '999px', margin: 0 }
const h1 = { fontSize: '24px', fontWeight: 800 as const, color: BRAND_BLACK, margin: '8px 28px 8px', lineHeight: '1.25' }
const subtitle = { fontSize: '15px', color: '#3f4756', margin: '0 28px 22px', lineHeight: '1.55' }
const card = { backgroundColor: '#f7f7f5', borderRadius: '10px', padding: '16px 18px', margin: '0 28px 18px', border: '1px solid #ececec' }
const cardTitle = { fontSize: '11px', fontWeight: 800 as const, color: BRAND_BLACK, margin: '0 0 10px', textTransform: 'uppercase' as const, letterSpacing: '0.14em' }
const kv = { fontSize: '14px', color: '#1a1a1a', margin: '4px 0', lineHeight: '1.5' }
const kvLabel = { color: '#6b7280', fontWeight: 700 as const }
const confirmed = { color: CONFIRM_GREEN, fontWeight: 800 as const }
const whatNext = { backgroundColor: BRAND_BLACK, borderRadius: '10px', padding: '18px 22px', margin: '0 28px 18px', borderLeft: `6px solid ${BRAND_YELLOW}` }
const whatNextKicker = { fontSize: '11px', fontWeight: 800 as const, color: BRAND_YELLOW, margin: '0 0 10px', textTransform: 'uppercase' as const, letterSpacing: '0.14em' }
const whatNextItem = { fontSize: '14px', color: '#ffffff', margin: '4px 0', lineHeight: '1.55' }
const ctaText = { fontSize: '14px', color: '#1a1a1a', margin: '8px 28px 10px', textAlign: 'center' as const }
const cta = { backgroundColor: BRAND_YELLOW, color: BRAND_BLACK, borderRadius: '10px', padding: '14px 24px', fontSize: '15px', fontWeight: 800 as const, textDecoration: 'none', display: 'block', textAlign: 'center' as const, margin: '0 28px' }
const hr = { borderColor: '#ececec', margin: '24px 28px' }
const footer = { fontSize: '12px', color: '#888', margin: '0 28px 24px', lineHeight: '1.5' }