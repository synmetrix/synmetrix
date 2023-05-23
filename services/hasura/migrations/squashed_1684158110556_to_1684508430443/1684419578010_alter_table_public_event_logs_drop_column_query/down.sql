alter table "public"."event_logs" alter column "query" drop not null;
alter table "public"."event_logs" add column "query" text;
