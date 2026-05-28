import * as React from 'react'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'ChimCrew'

interface NewLeadProps {
  source?: string
  name?: string
  phone?: string
  email?: string
  service?: string
  city?: string
  address?: string
  date?: string
  timeWindow?: string
  notes?: string
}

const NewLeadNotificationEmail = ({
  source = 'Website',
  name = 'Not provided',
  phone = 'Not provided',
  email = 'Not provided',
  service = 'Not specified',
  city = '',
  address = '',
  date = '',
  timeWindow = '',
  notes = '',
}: NewLeadProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New lead from {name} — {service}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🔥 New lead on {SITE_NAME}</Heading>
        <Text style={subtitle}>Source: {source}</Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Phone" value={phone} />
          <Row label="Email" value={email} />
          <Row label="Service" value={service} />
          {city ? <Row label="City" value={city} /> : null}
          {address ? <Row label="Address" value={address} /> : null}
          {date ? <Row label="Date" value={date} /> : null}
          {timeWindow ? <Row label="Time window" value={timeWindow} /> : null}
        </Section>

        {notes ? (
          <>
            <Hr style={hr} />
            <Text style={notesLabel}>Notes</Text>
            <Text style={notesText}>{notes}</Text>
          </>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>Call them back ASAP — the faster the better.</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={rowStyle}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value}</span>
  </Text>
)

export const template = {
  component: NewLeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New lead: ${data?.name || 'Unknown'}${data?.service ? ' — ' + data.service : ''}`,
  displayName: 'New lead notification',
  previewData: {
    source: 'Quote form',
    name: 'Jane Smith',
    phone: '(614) 555-0123',
    email: 'jane@example.com',
    service: 'Chimney Sweep',
    city: 'Columbus',
    address: '123 Main St',
    notes: 'Last cleaned 2022, smells smoky.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0a0a0a', margin: '0 0 6px' }
const subtitle = { fontSize: '12px', color: '#888', margin: '0 0 18px', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }
const card = { backgroundColor: '#f7f5f1', borderRadius: '8px', padding: '16px 18px', border: '1px solid #ececec' }
const rowStyle = { fontSize: '14px', color: '#1a1a1a', margin: '4px 0', lineHeight: '1.5' }
const rowLabel = { color: '#888', fontWeight: 600 as const }
const rowValue = { color: '#0a0a0a' }
const hr = { borderColor: '#ececec', margin: '20px 0' }
const notesLabel = { fontSize: '12px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 6px' }
const notesText = { fontSize: '14px', color: '#1a1a1a', lineHeight: '1.5', margin: '0' }
const footer = { fontSize: '12px', color: '#888', margin: '12px 0 0' }