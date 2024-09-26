-- Перенос данных из таблицы datasources в таблицу credentials
INSERT INTO "public"."credentials" ("datasource_id", "user_id", "db_params")
SELECT "id", "user_id", "db_params" FROM "public"."datasources";