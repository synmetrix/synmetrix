alter table "public"."datasources" alter column "auth" set default ''shared'::text';
alter table "public"."datasources" alter column "auth" drop not null;
alter table "public"."datasources" add column "auth" text;
