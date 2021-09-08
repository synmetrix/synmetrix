alter table "public"."datasources" alter column "db_params" set default '{}'::jsonb;
alter table "public"."datasources" alter column "db_params" set not null;
