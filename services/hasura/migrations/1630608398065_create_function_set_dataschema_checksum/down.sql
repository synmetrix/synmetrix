-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.set_dataschema_checksum() RETURNS trigger
--     LANGUAGE plpgsql
--     AS $$
-- declare
--   _new record;
-- begin
--   _new := new;
--   _new. "checksum" = MD5(concat(NEW."name", '-', NEW.code));
--   return _new;
-- end;
-- $$;
