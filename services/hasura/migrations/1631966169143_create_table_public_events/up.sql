CREATE TABLE "public"."events" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "data" jsonb NOT NULL DEFAULT '{}'::jsonb, "page_context" jsonb NOT NULL DEFAULT '{}'::jsonb, "device_context" jsonb NOT NULL DEFAULT '{}'::jsonb, "user" jsonb NOT NULL DEFAULT '{}'::jsonb, PRIMARY KEY ("id") );COMMENT ON TABLE "public"."events" IS E'suitable for Events Analytics';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_events_updated_at"
BEFORE UPDATE ON "public"."events"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_events_updated_at" ON "public"."events" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
