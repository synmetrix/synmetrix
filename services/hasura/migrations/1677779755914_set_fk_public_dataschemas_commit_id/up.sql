alter table "public"."dataschemas"
  add constraint "dataschemas_commit_id_fkey"
  foreign key ("commit_id")
  references "public"."commits"
  ("id") on update cascade on delete cascade;
