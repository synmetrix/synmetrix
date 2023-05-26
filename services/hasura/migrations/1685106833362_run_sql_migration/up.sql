CREATE OR REPLACE FUNCTION public.duration(request_logs_row request_logs)
 RETURNS double precision
 LANGUAGE sql
 STABLE
AS $function$
  SELECT EXTRACT(EPOCH FROM request_logs_row.start_time - request_logs_row.end_time) * 1000
$function$;
