alter table "public"."dashboards"
  add constraint "dashboards_datasource_id_fkey"
  foreign key ("datasource_id")
  references "public"."datasources"
  ("id") on update no action on delete cascade;
