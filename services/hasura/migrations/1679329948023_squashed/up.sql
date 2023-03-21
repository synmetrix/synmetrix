
alter table "public"."dataschemas" drop column "branch" cascade;

DROP INDEX IF EXISTS "public"."dataschemas_datasource_id_branch_name_key";

alter table "public"."dataschemas" add column "version_id" uuid
 null;

CREATE TABLE "public"."versions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "branch_id" uuid NOT NULL, "checksum" text NOT NULL, PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_versions_updated_at"
BEFORE UPDATE ON "public"."versions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_versions_updated_at" ON "public"."versions" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."branches" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL DEFAULT 'main', "user_id" uuid NOT NULL, "datasource_id" uuid NOT NULL, "status" text NOT NULL DEFAULT 'created', PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("datasource_id") REFERENCES "public"."datasources"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_branches_updated_at"
BEFORE UPDATE ON "public"."branches"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_branches_updated_at" ON "public"."branches" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."versions"
  add constraint "versions_branch_id_fkey"
  foreign key ("branch_id")
  references "public"."branches"
  ("id") on update cascade on delete cascade;

alter table "public"."dataschemas"
  add constraint "dataschemas_version_id_fkey"
  foreign key ("version_id")
  references "public"."versions"
  ("id") on update cascade on delete cascade;

alter table "public"."versions" add column "user_id" uuid
 not null;

alter table "public"."versions"
  add constraint "versions_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete cascade;

alter table "public"."dataschemas" drop column "datasource_id" cascade;

alter table "public"."dataschemas" add column "datasource_id" uuid
 null;

alter table "public"."dataschemas"
  add constraint "dataschemas_datasource_id_fkey"
  foreign key ("datasource_id")
  references "public"."datasources"
  ("id") on update cascade on delete cascade;
