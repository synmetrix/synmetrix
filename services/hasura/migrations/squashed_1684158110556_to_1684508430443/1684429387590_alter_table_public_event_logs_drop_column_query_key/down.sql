alter table "public"."event_logs" alter column "query_key" drop not null;
alter table "public"."event_logs" add column "query_key" text;
