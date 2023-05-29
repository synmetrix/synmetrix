

CREATE TABLE "public"."request_logs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "request_id" text NOT NULL, "user_id" uuid NOT NULL, "datasource_id" uuid NOT NULL, "start_time" timestamptz NOT NULL, "end_time" timestamptz NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("datasource_id") REFERENCES "public"."datasources"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("request_id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_request_logs_updated_at"
BEFORE UPDATE ON "public"."request_logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_request_logs_updated_at" ON "public"."request_logs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.duration(request_logs_row request_logs)
 RETURNS double precision
 LANGUAGE sql
 STABLE
AS $function$
  SELECT EXTRACT(EPOCH FROM request_logs_row.end_time - request_logs_row.start_time) * 1000
$function$;

CREATE TABLE "public"."request_event_logs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "request_id" Text NOT NULL, "event" text NOT NULL, "duration" numeric, "queue_prefix" text, "time_in_queue" numeric, "path" text, "query_key" jsonb DEFAULT jsonb_build_array(), "query_key_md5" text, "query" jsonb, "query_sql" text, "timestamp" timestamptz, PRIMARY KEY ("id") , FOREIGN KEY ("request_id") REFERENCES "public"."request_logs"("request_id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_request_event_logs_updated_at"
BEFORE UPDATE ON "public"."request_event_logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_request_event_logs_updated_at" ON "public"."request_event_logs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."request_logs" add column "path" text
 null;
