
alter table "public"."dataschemas" drop constraint "dataschemas_datasource_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."dataschemas" add column "datasource_id" uuid
--  null;

alter table "public"."dataschemas"
  add constraint "dataschemas_datasource_id_fkey"
  foreign key (datasource_id)
  references "public"."datasources"
  (id) on update cascade on delete cascade;
alter table "public"."dataschemas" alter column "datasource_id" drop not null;
alter table "public"."dataschemas" add column "datasource_id" uuid;

alter table "public"."versions" drop constraint "versions_user_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."versions" add column "user_id" uuid
--  not null;

alter table "public"."dataschemas" drop constraint "dataschemas_version_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."dataschemas" add column "version_id" uuid
--  null;

alter table "public"."dataschemas" alter column "version_id" drop not null;
alter table "public"."dataschemas" add column "version_id" uuid;

alter table "public"."versions" drop constraint "versions_branch_id_fkey";

DROP TABLE "public"."branches";

DROP TABLE "public"."versions";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."dataschemas" add column "version_id" uuid
--  null;

CREATE  INDEX "dataschemas_datasource_id_branch_name_key" on
  "public"."dataschemas" using btree ("branch", "datasource_id", "name");

alter table "public"."dataschemas" alter column "branch" set default ''main'::text';
alter table "public"."dataschemas" add constraint "dataschemas_datasource_id_branch_name_key" unique (datasource_id, branch, name);
alter table "public"."dataschemas" alter column "branch" drop not null;
alter table "public"."dataschemas" add column "branch" text;
