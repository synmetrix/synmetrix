alter table "public"."explorations"
  add constraint "explorations_team_id_fkey"
  foreign key (team_id)
  references "public"."teams"
  (id) on update no action on delete cascade;
alter table "public"."explorations" alter column "team_id" drop not null;
alter table "public"."explorations" add column "team_id" uuid;
