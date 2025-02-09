INSERT INTO "public"."credentials" ("datasource_id", "user_id", "username", "password")
SELECT 
    "id", 
    "user_id", 
    ("db_params"->>'user')::text AS "username",
    ("db_params"->>'password')::text AS "password"
FROM "public"."datasources";

UPDATE "public"."datasources"
SET "db_params" = (
    SELECT jsonb_object_agg(key, value)
    FROM jsonb_each("db_params") AS t(key, value)
    WHERE key NOT IN ('user', 'password')
)
WHERE "db_params" ? 'user' OR "db_params" ? 'password';