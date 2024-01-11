alter table "public"."branches" add constraint "branches_datasource_id_name_key" unique ("datasource_id", "name");
