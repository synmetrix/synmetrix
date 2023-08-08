
alter table "public"."access_lists" drop constraint "access_lists_team_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."access_lists" add column "team_id" uuid
--  not null;

alter table "public"."access_lists" alter column "created_by" drop not null;
alter table "public"."access_lists" add column "created_by" uuid;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."access_lists" add column "created_by" uuid
--  not null;

alter table "public"."member_roles" drop constraint "member_roles_team_role_fkey",
  add constraint "member_roles_team_role_fkey"
  foreign key ("team_role")
  references "public"."team_roles"
  ("name") on update cascade on delete cascade;


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
