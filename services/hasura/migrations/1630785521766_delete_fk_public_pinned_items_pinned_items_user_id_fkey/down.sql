alter table "public"."pinned_items"
  add constraint "pinned_items_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update cascade on delete cascade;
