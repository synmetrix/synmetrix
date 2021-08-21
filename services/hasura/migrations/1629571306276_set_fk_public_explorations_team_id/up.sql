alter table "public"."explorations"
  add constraint "explorations_team_id_fkey"
  foreign key ("team_id")
  references "public"."teams"
  ("id") on update set null on delete set null;
