alter table "public"."pinned_items" drop constraint "pinned_items_dashboard_id_fkey",
  add constraint "pinned_items_dashboard_id_fkey"
  foreign key ("dashboard_id")
  references "public"."dashboards"
  ("id") on update cascade on delete cascade;
