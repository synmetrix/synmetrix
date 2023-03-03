alter table "public"."dataschemas" alter column "branch" set default ''main'::text';
alter table "public"."dataschemas" add constraint "dataschemas_datasource_id_branch_name_key" unique (name, datasource_id, branch);
alter table "public"."dataschemas" alter column "branch" drop not null;
alter table "public"."dataschemas" add column "branch" text;
