alter table "public"."datasources"
  add constraint "datasources_auth_fkey"
  foreign key ("auth")
  references "public"."auth_options"
  ("auth") on update cascade on delete cascade;
