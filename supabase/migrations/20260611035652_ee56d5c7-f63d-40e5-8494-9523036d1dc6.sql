CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text,
  name text,
  phone text,
  email text,
  service text,
  city text,
  address text,
  preferred_date text,
  time_window text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);