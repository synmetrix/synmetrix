alter table "public"."event_logs" add constraint "event_logs_request_id_event_key" unique ("request_id", "event");
