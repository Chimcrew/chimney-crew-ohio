
CREATE TABLE public.estimates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_type TEXT NOT NULL,
  doc_number TEXT NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  service_address TEXT,
  total NUMERIC,
  balance_due NUMERIC,
  pdf_path TEXT NOT NULL,
  sent_to TEXT,
  message_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.estimates TO service_role;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service role only" ON public.estimates FOR ALL TO service_role USING (true) WITH CHECK (true);
