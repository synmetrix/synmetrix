alter table "public"."member_roles" drop constraint "member_roles_team_role_fkey",
  add constraint "member_roles_team_role_fkey"
  foreign key ("team_role")
  references "public"."team_roles"
  ("name") on update cascade on delete cascade;
