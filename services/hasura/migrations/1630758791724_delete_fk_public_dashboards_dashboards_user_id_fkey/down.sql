alter table "public"."dashboards"
  add constraint "dashboards_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete cascade;
