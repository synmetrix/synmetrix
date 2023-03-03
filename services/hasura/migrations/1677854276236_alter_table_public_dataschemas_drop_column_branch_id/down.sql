alter table "public"."dataschemas"
  add constraint "dataschemas_branch_id_fkey"
  foreign key (branch_id)
  references "public"."branches"
  (id) on update cascade on delete cascade;
alter table "public"."dataschemas" alter column "branch_id" drop not null;
alter table "public"."dataschemas" add column "branch_id" uuid;
