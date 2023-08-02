
INSERT INTO "public"."team_roles"("name") VALUES (E'admin');

CREATE TABLE "public"."access_lists" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "access_list" jsonb NOT NULL DEFAULT jsonb_build_object(), PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_access_lists_updated_at"
BEFORE UPDATE ON "public"."access_lists"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_access_lists_updated_at" ON "public"."access_lists" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."member_roles" add column "access_list_id" uuid
 null;

alter table "public"."member_roles"
  add constraint "member_roles_access_list_id_fkey"
  foreign key ("access_list_id")
  references "public"."access_lists"
  ("id") on update cascade;

alter table "public"."access_lists" add column "name" text
 not null default 'Empty access list';
