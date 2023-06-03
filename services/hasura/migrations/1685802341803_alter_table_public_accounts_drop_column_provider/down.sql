alter table "public"."accounts" alter column "provider" set default ''supertokens'::text';
alter table "public"."accounts" alter column "provider" drop not null;
alter table "public"."accounts" add column "provider" text;
