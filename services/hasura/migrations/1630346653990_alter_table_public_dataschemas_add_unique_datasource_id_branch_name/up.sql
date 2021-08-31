alter table "public"."dataschemas" add constraint "dataschemas_datasource_id_branch_name_key" unique ("datasource_id", "branch", "name");
