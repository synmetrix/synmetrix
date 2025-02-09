CREATE TABLE "public"."member_credentials" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "member_id" uuid NOT NULL, "credential_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("credential_id") REFERENCES "public"."credentials"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("member_id", "credential_id"));
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
CREATE TRIGGER "set_public_member_credentials_updated_at"
BEFORE UPDATE ON "public"."member_credentials"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_member_credentials_updated_at" ON "public"."member_credentials"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
