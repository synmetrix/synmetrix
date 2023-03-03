alter table "public"."branches" alter column "status" set default ''created'::text';
alter table "public"."branches" alter column "status" drop not null;
alter table "public"."branches" add column "status" text;
