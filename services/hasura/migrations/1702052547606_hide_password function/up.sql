CREATE OR REPLACE FUNCTION public.hide_password(datasources_row datasources)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  SELECT jsonb_set(datasources_row.db_params, '{password}', '""')
$function$;
