alter table "public"."teams"
  add constraint "teams_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete cascade;
