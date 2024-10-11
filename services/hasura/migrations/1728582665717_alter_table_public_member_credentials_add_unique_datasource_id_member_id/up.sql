alter table "public"."member_credentials" add constraint "member_credentials_datasource_id_member_id_key" unique ("datasource_id", "member_id");
