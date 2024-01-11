alter table "public"."teams" add constraint "teams_user_id_name_key" unique ("user_id", "name");

-- set user_id to teams
UPDATE teams AS t
SET user_id = m.user_id
FROM members AS m
INNER JOIN member_roles AS mr ON mr.member_id = m.id
WHERE mr.team_role = 'owner' AND m.team_id = t.id;

-- delete teams without owners
DELETE FROM teams t
WHERE t.user_id is null;