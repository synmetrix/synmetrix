alter table "public"."credentials" add constraint "credentials_user_id_datasource_id_key" unique ("user_id", "datasource_id");
