CREATE OR REPLACE FUNCTION public.hide_password(credentials_row credentials)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  SELECT jsonb_set(credentials_row.db_params, '{password}', '""')
$function$;
