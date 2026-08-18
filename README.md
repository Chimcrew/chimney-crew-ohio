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

1. Connect this Git repository to a Netlify site.
2. Use the `netlify.toml` build settings (`npm run build`, publish `dist/client`, Node 22). If the Netlify UI still has `bun run build`, change it to `npm run build`.
3. Set these environment variables in the Netlify site (Site configuration → Environment variables), then trigger a new deploy:

**Build-time (required for the public site)**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

**Runtime (admin, leads, and email)**
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_LEADS_PASSCODE`
- `LOVABLE_API_KEY` (only if transactional email is still used)
- `LOVABLE_SEND_URL` (only if transactional email is still used)
