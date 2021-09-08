alter table "public"."members" alter column "roles" set default '[]'::jsonb;
alter table "public"."members" alter column "roles" drop not null;
alter table "public"."members" add column "roles" jsonb;
