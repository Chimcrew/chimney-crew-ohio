CREATE POLICY "Service role manages estimates objects"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'estimates')
WITH CHECK (bucket_id = 'estimates');