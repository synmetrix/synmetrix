alter table "public"."accounts" add column "meta" jsonb
 not null default '{}';
