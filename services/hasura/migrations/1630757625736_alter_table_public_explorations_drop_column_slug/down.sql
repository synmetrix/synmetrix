alter table "public"."explorations" alter column "slug" drop not null;
alter table "public"."explorations" add column "slug" text;
