
DROP TABLE "public"."request_event_logs";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.duration(request_logs_row request_logs)
--  RETURNS double precision
--  LANGUAGE sql
--  STABLE
-- AS $function$
--   SELECT EXTRACT(EPOCH FROM request_logs_row.end_time - request_logs_row.start_time) * 1000
-- $function$;

DROP TABLE "public"."request_logs";
