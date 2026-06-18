CREATE OR REPLACE FUNCTION public.enqueue_email_delayed(queue_name text, payload jsonb, delay_seconds integer)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq
AS $$
BEGIN
  RETURN pgmq.send(queue_name, payload, delay_seconds);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload, delay_seconds);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.enqueue_email_delayed(text, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email_delayed(text, jsonb, integer) TO service_role;