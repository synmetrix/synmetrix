alter table "public"."dashboards"
  add constraint "dashboards_team_id_fkey"
  foreign key (team_id)
  references "public"."teams"
  (id) on update set null on delete set null;
alter table "public"."dashboards" alter column "team_id" drop not null;
alter table "public"."dashboards" add column "team_id" uuid;
