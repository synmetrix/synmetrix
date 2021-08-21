alter table "public"."pinned_items"
  add constraint "pinned_items_team_id_fkey"
  foreign key ("team_id")
  references "public"."teams"
  ("id") on update set null on delete set null;
