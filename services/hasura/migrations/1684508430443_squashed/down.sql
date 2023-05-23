
alter table "public"."event_logs" alter column "event_id" drop not null;
alter table "public"."event_logs" add column "event_id" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."event_logs" add column "query_key" jsonb
--  null default jsonb_build_array();

alter table "public"."event_logs" alter column "query_key" drop not null;
alter table "public"."event_logs" add column "query_key" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."event_logs" add column "query" jsonb
--  null;

alter table "public"."event_logs" alter column "query" drop not null;
alter table "public"."event_logs" add column "query" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."event_logs" add column "query_sql" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."event_logs" add column "query_key_md5" text
--  null;

alter table "public"."event_logs" drop constraint "event_logs_request_id_event_key";

alter table "public"."event_logs" alter column "event_id" set not null;

DROP TABLE "public"."event_logs";

DROP TABLE "public"."request_logs";
