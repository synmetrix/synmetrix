alter table "public"."access_lists"
  add constraint "access_lists_team_id_fkey"
  foreign key ("team_id")
  references "public"."teams"
  ("id") on update cascade on delete cascade;
