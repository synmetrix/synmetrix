alter table "public"."explorations" drop constraint "explorations_team_id_fkey",
  add constraint "explorations_team_id_fkey"
  foreign key ("team_id")
  references "public"."teams"
  ("id") on update no action on delete cascade;
