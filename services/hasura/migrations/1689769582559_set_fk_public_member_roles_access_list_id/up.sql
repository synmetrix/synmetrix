alter table "public"."member_roles"
  add constraint "member_roles_access_list_id_fkey"
  foreign key ("access_list_id")
  references "public"."access_lists"
  ("id") on update cascade on delete cascade;
