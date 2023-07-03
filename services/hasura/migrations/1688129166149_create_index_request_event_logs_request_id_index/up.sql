CREATE  INDEX "request_event_logs_request_id_index" on
  "public"."request_event_logs" using hash ("request_id");
