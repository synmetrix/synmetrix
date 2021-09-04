alter table "public"."dashboards" drop constraint "dashboards_datasource_id_fkey",
  add constraint "dashboards_team_id_fkey"
  foreign key ("team_id")
  references "public"."teams"
  ("id") on update no action on delete cascade;
