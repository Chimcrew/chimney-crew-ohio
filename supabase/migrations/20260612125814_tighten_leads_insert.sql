-- Tighten the public lead insert policy: replace permissive WITH CHECK (true)
-- with input validation to prevent garbage/abuse submissions.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (
    (phone IS NOT NULL AND length(btrim(phone)) BETWEEN 7 AND 32)
    OR (email IS NOT NULL AND length(btrim(email)) BETWEEN 5 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
  )
  AND (name IS NULL OR length(name) <= 120)
  AND (service IS NULL OR length(service) <= 120)
  AND (city IS NULL OR length(city) <= 120)
  AND (address IS NULL OR length(address) <= 255)
  AND (preferred_date IS NULL OR length(preferred_date) <= 64)
  AND (time_window IS NULL OR length(time_window) <= 64)
  AND (notes IS NULL OR length(notes) <= 2000)
  AND (source IS NULL OR length(source) <= 64)
);
