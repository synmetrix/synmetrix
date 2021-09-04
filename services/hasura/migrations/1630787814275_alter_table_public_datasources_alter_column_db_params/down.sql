alter table "public"."datasources" alter column "db_params" drop not null;
ALTER TABLE "public"."datasources" ALTER COLUMN "db_params" drop default;
