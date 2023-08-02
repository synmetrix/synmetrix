alter table "public"."access_lists" alter column "created_by" drop not null;
alter table "public"."access_lists" add column "created_by" uuid;
