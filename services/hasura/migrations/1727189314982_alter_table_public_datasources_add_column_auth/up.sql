alter table "public"."datasources" add column "auth" text
 not null default 'shared';
