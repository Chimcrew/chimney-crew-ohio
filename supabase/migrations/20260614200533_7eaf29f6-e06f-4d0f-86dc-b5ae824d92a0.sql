DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (name IS NULL OR char_length(name) BETWEEN 1 AND 120)
  AND (phone IS NULL OR char_length(phone) BETWEEN 7 AND 32)
  AND (email IS NULL OR (char_length(email) BETWEEN 5 AND 254 AND position('@' in email) > 1))
  AND (service IS NULL OR char_length(service) <= 120)
  AND (city IS NULL OR char_length(city) <= 120)
  AND (address IS NULL OR char_length(address) <= 240)
  AND (preferred_date IS NULL OR char_length(preferred_date) <= 40)
  AND (time_window IS NULL OR char_length(time_window) <= 60)
  AND (notes IS NULL OR char_length(notes) <= 2000)
  AND (source IS NULL OR char_length(source) <= 60)
  AND (coalesce(name, '') <> '' OR coalesce(phone, '') <> '' OR coalesce(email, '') <> '')
);