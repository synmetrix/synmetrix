CREATE TABLE "public"."accounts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "external_id" uuid NOT NULL, "provider" text NOT NULL DEFAULT 'supertokens', "user_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
