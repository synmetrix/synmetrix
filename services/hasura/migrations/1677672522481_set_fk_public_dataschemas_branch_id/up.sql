alter table "public"."dataschemas"
  add constraint "dataschemas_branch_id_fkey"
  foreign key ("branch_id")
  references "public"."branches"
  ("id") on update cascade on delete cascade;
