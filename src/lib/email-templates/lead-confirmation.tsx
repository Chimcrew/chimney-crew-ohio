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
    <Preview>We received your request — expect a call within the hour.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thanks, {name.split(' ')[0]}!</Heading>
        <Text style={subtitle}>We received your {service} request.</Text>

        <Section style={card}>
          <Text style={cardTitle}>What happens next?</Text>
          <ul style={list}>
            <li style={listItem}>One of our Ohio crew members will call or text you within <strong>1 business hour</strong>.</li>
            <li style={listItem}>We will confirm your address in {city} and schedule a convenient time.</li>
            <li style={listItem}>Your inspection includes a written photo report — no pressure, no surprise charges.</li>
          </ul>
        </Section>

        <Text style={ctaText}>Questions? Call us directly:</Text>
        <Button href={PHONE_HREF} style={cta}>
          {PHONE}
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
    `ChimCrew — we received your ${data?.service || 'request'}`,
  displayName: 'Lead confirmation',
  previewData: {
    name: 'Jane Smith',
    service: 'Free chimney inspection',
    city: 'Columbus',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0a0a0a', margin: '0 0 6px' }
const subtitle = { fontSize: '14px', color: '#555', margin: '0 0 18px', lineHeight: '1.5' }
const card = { backgroundColor: '#f7f5f1', borderRadius: '8px', padding: '16px 18px', border: '1px solid #ececec' }
const cardTitle = { fontSize: '13px', fontWeight: 'bold' as const, color: '#0a0a0a', margin: '0 0 10px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }
const list = { padding: '0 0 0 18px', margin: '0' }
const listItem = { fontSize: '14px', color: '#1a1a1a', margin: '6px 0', lineHeight: '1.5' }
const ctaText = { fontSize: '14px', color: '#1a1a1a', margin: '20px 0 8px', textAlign: 'center' as const }
const cta = { backgroundColor: '#c2410c', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: 'bold' as const, textDecoration: 'none', display: 'block', textAlign: 'center' as const }
const hr = { borderColor: '#ececec', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#888', margin: '12px 0 0', lineHeight: '1.5' }
