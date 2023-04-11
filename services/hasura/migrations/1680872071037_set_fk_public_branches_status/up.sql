alter table "public"."branches"
  add constraint "branches_status_fkey"
  foreign key ("status")
  references "public"."branch_statuses"
  ("status") on update restrict on delete restrict;
