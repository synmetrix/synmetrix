alter table "public"."explorations"
  add constraint "explorations_branch_id_fkey"
  foreign key ("branch_id")
  references "public"."branches"
  ("id") on update cascade on delete cascade;
