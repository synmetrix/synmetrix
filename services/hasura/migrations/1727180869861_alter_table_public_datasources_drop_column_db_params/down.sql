alter table "public"."datasources" alter column "db_params" set default '{}'::jsonb;
alter table "public"."datasources" alter column "db_params" drop not null;
alter table "public"."datasources" add column "db_params" jsonb;
