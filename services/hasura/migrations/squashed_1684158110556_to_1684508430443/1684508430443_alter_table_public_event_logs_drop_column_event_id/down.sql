alter table "public"."event_logs" alter column "event_id" drop not null;
alter table "public"."event_logs" add column "event_id" text;
