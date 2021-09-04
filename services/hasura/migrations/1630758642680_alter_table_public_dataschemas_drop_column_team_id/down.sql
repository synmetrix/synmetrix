alter table "public"."dataschemas"
  add constraint "dataschemas_team_id_fkey"
  foreign key (team_id)
  references "public"."teams"
  (id) on update set null on delete set null;
alter table "public"."dataschemas" alter column "team_id" drop not null;
alter table "public"."dataschemas" add column "team_id" uuid;
