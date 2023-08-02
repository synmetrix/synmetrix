
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."access_lists" add column "name" text
--  not null default 'Empty access list';

alter table "public"."member_roles" drop constraint "member_roles_access_list_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."member_roles" add column "access_list_id" uuid
--  null;

DROP TABLE "public"."access_lists";

DELETE FROM "public"."team_roles" WHERE "name" = 'admin';
