alter table "public"."users"
  add constraint "users_team_id_fkey"
  foreign key ("team_id")
  references "public"."teams"
  ("id") on update cascade on delete cascade;
