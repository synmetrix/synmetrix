CREATE TABLE "public"."alerts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "team_id" uuid, "exploration_id" uuid NOT NULL, "name" text NOT NULL, "delivery_type" text NOT NULL, "delivery_config" jsonb NOT NULL, "trigger_config" jsonb NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON UPDATE set null ON DELETE set null, FOREIGN KEY ("exploration_id") REFERENCES "public"."explorations"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_alerts_updated_at"
BEFORE UPDATE ON "public"."alerts"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_alerts_updated_at" ON "public"."alerts" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
