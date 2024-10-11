alter table "public"."member_credentials" drop constraint "member_credentials_credential_id_member_id_key";
alter table "public"."member_credentials" add constraint "member_credentials_credential_id_member_id_key" unique ("credential_id", "member_id");
