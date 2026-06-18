CREATE OR REPLACE FUNCTION public.enqueue_email_delayed(queue_name text, payload jsonb, delay_seconds integer)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN pgmq.send(queue_name, payload, delay_seconds);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload, delay_seconds);
END;
$$;

GRANT EXECUTE ON FUNCTION public.enqueue_email_delayed(text, jsonb, integer) TO service_role;