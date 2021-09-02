CREATE OR REPLACE FUNCTION public.set_dataschema_checksum() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  _new record;
begin
  _new := new;
  _new. "checksum" = MD5(concat(NEW."name", '-', NEW.code));
  return _new;
end;
$$;
