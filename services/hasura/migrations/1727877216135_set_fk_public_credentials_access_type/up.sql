alter table "public"."credentials"
  add constraint "credentials_access_type_fkey"
  foreign key ("access_type")
  references "public"."access_types"
  ("access_type") on update cascade on delete cascade;
