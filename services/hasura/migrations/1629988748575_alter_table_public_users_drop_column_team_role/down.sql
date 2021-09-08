alter table "public"."users" alter column "team_role" drop not null;
alter table "public"."users" add column "team_role" text;
