# Chimney Crew Ohio

i want to build a website for chimney service in columbus cincinnati and dayton in ohio
local owned business
i want a unique UX UI design with a unique font and sales flow to leave details
i want a full website - not only 1 page with sections, i want reviews page, gallery page, before and after page, and the homepage needs to be a great show - with a great flow to leave the user's details
i want you to base on the photo attached and combine this car with the name 'chimcrew' in the logo - create the logo with the car, i want the header to be unique with the logo with the car like 3D moving to the hero section, like a cool connection, then i want the same car in the details form or in the hero section
you can based on other chimney website like https://www.bhochimneysweep.com/
or something else
but stick my instructions
dont forget to build a stunning footer as well, with a map that shows where we serve, with the legal pages as well like disclaimer and all of the 4 pages needed

## Development

Node.js 22+ and npm are required.

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

The local app is at http://localhost:8080/.

## Deploy on Netlify

This is a TanStack Start app. Netlify serves static assets from `dist/client` and SSR from a Netlify Function.

Lead forms use **Netlify Forms** (`chimcrew-lead`). No Lovable or Supabase keys are required for the public site.

1. Connect this Git repository to a Netlify site.
2. Use the `netlify.toml` build settings (`npm run build`, publish `dist/client`, Node 22). If the Netlify UI still has `bun run build`, change it to `npm run build`.
3. Keep the Form notification you already added to `theductorsairduct@gmail.com`.
4. Add **one** environment variable so the customer gets a confirmation email 5 minutes after submit (same as the old Lovable flow):

   - `RESEND_API_KEY` — free key from [resend.com](https://resend.com)
   - Optional: `CONFIRM_FROM_EMAIL` (default is `ChimCrew <onboarding@resend.dev>` until you verify chimcrew.com)

The delayed email uses the old “appointment confirmed” copy: name, service, area, address, date, time window, and phone. It goes to the lead and to `theductorsairduct@gmail.com`.

5. Send every scheduled appointment into **Workiz**:

   - `WORKIZ_API_TOKEN` — from Workiz → Settings → Integrations (enable Developer API). Creates a CRM lead.
   - Optional: `WORKIZ_LEAD_TYPE` if Workiz rejects the service name as a lead type (example: `Inspection`).
   - Optional: `WORKIZ_INBOUND_EMAIL` (default `chimcrew@msg.workiz.com`) — same email-to-Workiz path as before, sent immediately via Resend.

Leads also show under **Forms → Form submissions**. The `/admin/leads` page is the old Supabase inbox and is unused for new submissions.
