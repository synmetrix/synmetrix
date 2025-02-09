alter table "public"."credentials" add column "access_type" text
 not null default 'shared';
