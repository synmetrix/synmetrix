alter table "public"."alerts" add column "locks_config" jsonb
 null default jsonb_build_object();
