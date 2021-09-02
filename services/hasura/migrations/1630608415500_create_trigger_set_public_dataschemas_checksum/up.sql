DROP TRIGGER IF EXISTS set_public_dataschemas_checksum ON "public"."dataschemas";

CREATE TRIGGER "set_public_dataschemas_checksum"
BEFORE UPDATE OR INSERT ON "public"."dataschemas"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_dataschema_checksum"();
COMMENT ON TRIGGER "set_public_dataschemas_checksum" ON "public"."dataschemas" 
IS 'trigger to set value of column "checksum" to MD5(name and code) hash on row insert, update';
