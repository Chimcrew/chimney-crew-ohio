import * as React from 'react'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'ChimCrew'
const PHONE = '(614) 683-5763'
const PHONE_HREF = 'tel:6146835763'

interface LeadConfirmationProps {
  name?: string
  service?: string
  city?: string
}

const LeadConfirmationEmail = ({
  name = 'there',
  service = 'Free chimney inspection',
  city = 'Columbus',
}: LeadConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your appointment request is in — confirmation arriving shortly.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar}>
          <Text style={brandMark}>CHIMCREW</Text>
        </Section>

        <Heading style={h1}>Appointment received, {name.split(' ')[0]}.</Heading>
        <Text style={subtitle}>
          We got your request for <strong>{service}</strong>{city ? ` in ${city}` : ''}.
        </Text>

        <Section style={statusCard}>
          <Text style={statusKicker}>What happens next</Text>
          <Text style={statusHeadline}>
            Your <strong>appointment confirmation email</strong> will arrive within the next <strong>10 minutes</strong>.
          </Text>
          <Text style={statusBody}>
            It will include your scheduled day, time window, and the name of the CSIA-certified tech assigned to your job.
          </Text>
        </Section>

        <Section style={card}>
          <Text style={cardTitle}>Your request</Text>
          <Text style={kv}><span style={kvLabel}>Service · </span>{service}</Text>
          {city ? <Text style={kv}><span style={kvLabel}>Area · </span>{city}</Text> : null}
          <Text style={kv}><span style={kvLabel}>Status · </span>Pending confirmation</Text>
        </Section>

        <Text style={ctaText}>Need to reach us sooner?</Text>
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
  component: LeadConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `ChimCrew — appointment confirmation on the way`,
  displayName: 'Lead confirmation',
  previewData: {
    name: 'Jane Smith',
    service: 'Free chimney inspection',
    city: 'Columbus',
  },
} satisfies TemplateEntry

// Brand: truck-black + hi-vis yellow
const BRAND_BLACK = '#0B0F19'
const BRAND_YELLOW = '#FACC15'

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const brandBar = { backgroundColor: BRAND_BLACK, padding: '18px 28px', borderBottom: `4px solid ${BRAND_YELLOW}` }
const brandMark = { color: BRAND_YELLOW, fontSize: '18px', fontWeight: 800 as const, letterSpacing: '0.18em', margin: 0 }
const h1 = { fontSize: '24px', fontWeight: 800 as const, color: BRAND_BLACK, margin: '28px 28px 8px', lineHeight: '1.25' }
const subtitle = { fontSize: '15px', color: '#3f4756', margin: '0 28px 22px', lineHeight: '1.55' }
const statusCard = { backgroundColor: BRAND_BLACK, borderRadius: '10px', padding: '20px 22px', margin: '0 28px 18px', borderLeft: `6px solid ${BRAND_YELLOW}` }
const statusKicker = { fontSize: '11px', fontWeight: 800 as const, color: BRAND_YELLOW, margin: '0 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.14em' }
const statusHeadline = { fontSize: '16px', color: '#ffffff', margin: '0 0 8px', lineHeight: '1.45' }
const statusBody = { fontSize: '14px', color: '#cfd4dd', margin: 0, lineHeight: '1.55' }
const card = { backgroundColor: '#f7f7f5', borderRadius: '10px', padding: '16px 18px', margin: '0 28px 18px', border: '1px solid #ececec' }
const cardTitle = { fontSize: '11px', fontWeight: 800 as const, color: BRAND_BLACK, margin: '0 0 10px', textTransform: 'uppercase' as const, letterSpacing: '0.14em' }
const kv = { fontSize: '14px', color: '#1a1a1a', margin: '4px 0', lineHeight: '1.5' }
const kvLabel = { color: '#6b7280', fontWeight: 700 as const }
const ctaText = { fontSize: '14px', color: '#1a1a1a', margin: '8px 28px 10px', textAlign: 'center' as const }
const cta = { backgroundColor: BRAND_YELLOW, color: BRAND_BLACK, borderRadius: '10px', padding: '14px 24px', fontSize: '15px', fontWeight: 800 as const, textDecoration: 'none', display: 'block', textAlign: 'center' as const, margin: '0 28px' }
const hr = { borderColor: '#ececec', margin: '24px 28px' }
const footer = { fontSize: '12px', color: '#888', margin: '0 28px 24px', lineHeight: '1.5' }
