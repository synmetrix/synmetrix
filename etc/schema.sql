CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

create extension if not exists pgcrypto;
create schema if not exists public;

create type cubejs_db_type AS enum ('postgres', 'mysql', 'mongobi', 'athena', 'bigquery', 'redshift', 'mssql', 'clickhouse');

--

create table if not exists public.teams (
  id serial primary key,
  name text not null,
  member_ids int[][] not null default '{}',
  created_at timestamptz not null default statement_timestamp(),
  updated_at timestamptz not null default statement_timestamp()
);

DROP TRIGGER IF EXISTS update_teams_updated_at ON public.teams;
CREATE TRIGGER
  update_teams_updated_at
  BEFORE UPDATE ON
    public.teams
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

--

create table if not exists public.users (
  id serial primary key,
  name text not null,
  email text not null UNIQUE,
  role text,
  password text not null,
  oauth_meta jsonb,
  created_at timestamptz not null default statement_timestamp(),
  updated_at timestamptz not null default statement_timestamp()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS team_id int references public.teams ON DELETE CASCADE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS team_role text default 'owner';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS active boolean default true;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER
  update_users_updated_at
  BEFORE UPDATE ON
    public.users
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

--
create type public.jwt_token as (
  user_id int,
  role text,
  email text
);
alter type public.jwt_token add attribute team_role text;

--
drop policy if exists anonymous_users_select on public.users;
drop policy if exists anonymous_users_insert on public.users;

drop policy if exists admin_users on public.users;
drop policy if exists admin_datasources on public.datasources;
drop policy if exists admin_dataschemas on public.dataschemas;
drop policy if exists admin_explorations on public.explorations;
drop policy if exists admin_dashboards on public.dashboards;
drop policy if exists admin_pinned_items on public.pinned_items;

drop policy if exists user_users on public.users;
drop policy if exists user_datasources on public.datasources;
drop policy if exists user_dataschemas on public.dataschemas;
drop policy if exists user_explorations on public.explorations;
drop policy if exists user_dashboards on public.dashboards;
drop policy if exists user_pinned_items on public.pinned_items;

drop role if exists auth_anonymous;
drop role if exists auth_user;
drop role if exists auth_admin;

create role auth_anonymous;
create role auth_user;
create role auth_admin;

create or replace function public.crypt_with_salt(
  password text
) returns text as $$
  select crypt(password, '$2a$06$Z7wmrkYMOyLboLcULUYzNe6nHUcWywSZTt6nSrT5Xdv/VLdJ4g99K')::text;
$$ language sql stable;

create or replace function public.current_user_id() returns integer as $$
  select current_setting('jwt.claims.user_id', true)::integer;
$$ language sql stable;

create or replace function public.current_team_member_ids() returns int[] as $$
  select member_ids
  from public.teams
  where member_ids @> ARRAY[public.current_user_id()]::int[];
$$ language sql stable;

create or replace function public.current_user() returns public.users AS $$
  select *
  from public.users
  where id = public.current_user_id()
$$ language sql stable;

-- subscriptions

CREATE OR REPLACE FUNCTION notify_user_with_id() RETURNS trigger AS $$
DECLARE
    side text;
    row_id integer;
    user_id integer;
    channel_key text;
    pg_notify_channel text;
BEGIN
  side = TG_ARGV[0];
  channel_key = TG_ARGV[1];

  IF side = 'OLD' THEN
    row_id = OLD.id;
    user_id = OLD.user_id;
  ELSE
    row_id = NEW.id;
    user_id = NEW.user_id;
  END IF;

  pg_notify_channel = cast(channel_key || '/' || user_id AS text);

  IF pg_notify_channel IS NOT NULL THEN
    perform pg_notify(
      COALESCE(pg_notify_channel, 'unnamed'),
      json_build_object(
        'operation', TG_OP,
        'id', row_id
      )::text
    );
  END IF;

  return NULL;
end;
$$ language plpgsql;

--

create table if not exists public.datasources (
  id serial primary key,
  user_id int not null references public.users ON DELETE SET NULL,
  name text not null,
  db_type cubejs_db_type not null,
  db_params json,
  created_at timestamptz not null default statement_timestamp(),
  updated_at timestamptz not null default statement_timestamp()
);

ALTER TABLE public.datasources ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_datasources_updated_at ON public.datasources;
CREATE TRIGGER
  update_datasources_updated_at
  BEFORE UPDATE ON
    public.datasources
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

drop trigger if exists datasources_update_notification on public.datasources;
create trigger
  datasources_update_notification
  after UPDATE on public.datasources
  for each row execute procedure notify_user_with_id('NEW', 'dataSourceUpdated');

drop trigger if exists datasources_create_notification on public.datasources;
create trigger
  datasources_create_notification
  after INSERT on public.datasources
  for each row execute procedure notify_user_with_id('NEW', 'dataSourceUpdated');

drop trigger if exists datasources_delete_notification on public.datasources;
create trigger
  datasources_delete_notification
  after DELETE on public.datasources
  for each row execute procedure notify_user_with_id('OLD', 'dataSourceUpdated');

--

create table if not exists public.dataschemas (
  id serial primary key,
  user_id int not null references public.users ON DELETE SET NULL,
  datasource_id int not null references public.datasources on delete cascade,
  name text not null,
  code text not null,
  created_at timestamptz not null default statement_timestamp(),
  updated_at timestamptz not null default statement_timestamp()
);

ALTER TABLE public.dataschemas ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_dataschemas_updated_at ON public.dataschemas;
CREATE TRIGGER
  update_dataschemas_updated_at
  BEFORE UPDATE ON
    public.dataschemas
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

drop trigger if exists dataschemas_update_notification on public.dataschemas;
create trigger
  dataschemas_update_notification
  after UPDATE on public.dataschemas
  for each row execute procedure notify_user_with_id('NEW', 'dataSchemaUpdated');

drop trigger if exists dataschemas_create_notification on public.dataschemas;
create trigger
  dataschemas_create_notification
  after INSERT on public.dataschemas
  for each row when (NEW.code != '')
  execute procedure notify_user_with_id('NEW', 'dataSchemaUpdated');

drop trigger if exists dataschemas_delete_notification on public.dataschemas;
create trigger
  dataschemas_delete_notification
  after DELETE on public.dataschemas
  for each row execute procedure notify_user_with_id('OLD', 'dataSchemaUpdated');

--

create table if not exists public.explorations (
  id serial primary key,
  user_id int not null references public.users ON DELETE SET NULL,
  datasource_id int not null references public.datasources on delete cascade,
  playground_state jsonb not null default '{}',
  playground_settings jsonb not null default '{}',
  slug text not null UNIQUE,
  created_at timestamptz not null default statement_timestamp(),
  updated_at timestamptz not null default statement_timestamp()
);

CREATE INDEX explorations_slug_idx ON explorations(slug);

ALTER TABLE public.explorations ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_explorations_updated_at ON public.explorations;
CREATE TRIGGER
  update_explorations_updated_at
  BEFORE UPDATE ON
    public.explorations
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

--

create table if not exists public.dashboards (
  id serial primary key,
  user_id int not null references public.users ON DELETE SET NULL,
  name text not null,
  layout jsonb,
  created_at timestamptz not null default statement_timestamp(),
  updated_at timestamptz not null default statement_timestamp()
);

ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_dashboards_updated_at ON public.dashboards;
CREATE TRIGGER
  update_dashboards_updated_at
  BEFORE UPDATE ON
    public.dashboards
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

drop trigger if exists dashboards_update_notification on public.dashboards;
create trigger
  dashboards_update_notification
  after UPDATE on public.dashboards
  for each row execute procedure notify_user_with_id('NEW', 'dashboardUpdated');

drop trigger if exists dashboards_create_notification on public.dashboards;
create trigger
  dashboards_create_notification
  after INSERT on public.dashboards
  for each row execute procedure notify_user_with_id('NEW', 'dashboardUpdated');

drop trigger if exists dashboards_delete_notification on public.dashboards;
create trigger
  dashboards_delete_notification
  after DELETE on public.dashboards
  for each row execute procedure notify_user_with_id('OLD', 'dashboardUpdated');

--

create table if not exists public.pinned_items (
  id serial primary key,
  user_id int not null references public.users ON DELETE SET NULL,
  dashboard_id int not null references public.dashboards on delete cascade,
  exploration_id int not null references public.explorations on delete cascade,
  name text not null,
  spec json not null,
  created_at timestamptz not null default statement_timestamp(),
  updated_at timestamptz not null default statement_timestamp()
);

ALTER TABLE public.pinned_items ADD COLUMN IF NOT EXISTS spec_config json not null default '{}';
ALTER TABLE public.pinned_items ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_pinned_items_updated_at ON public.pinned_items;
CREATE TRIGGER
  update_pinned_items_updated_at
  BEFORE UPDATE ON
    public.pinned_items
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

--

-- TODO make it more detailed
grant usage on schema public to auth_anonymous, auth_user, auth_admin;
grant select on table public.users to auth_anonymous;
grant insert on table public.users to auth_anonymous;
grant all privileges on table public.users to auth_user, auth_admin;
grant all privileges on table public.datasources to auth_user, auth_admin;
grant all privileges on table public.dataschemas to auth_user, auth_admin;
grant all privileges on table public.explorations to auth_user, auth_admin;
grant all privileges on table public.dashboards to auth_user, auth_admin;
grant all privileges on table public.pinned_items to auth_user, auth_admin;
grant all privileges on table public.teams to auth_user, auth_admin;

grant usage on sequence public.users_id_seq to auth_anonymous, auth_user, auth_admin;
grant usage on sequence public.datasources_id_seq to auth_user, auth_admin;
grant usage on sequence public.dataschemas_id_seq to auth_user, auth_admin;
grant usage on sequence public.explorations_id_seq to auth_user, auth_admin;
grant usage on sequence public.dashboards_id_seq to auth_user, auth_admin;
grant usage on sequence public.pinned_items_id_seq to auth_user, auth_admin;
grant usage on sequence public.teams_id_seq to auth_user, auth_admin;

-- RLS

create policy anonymous_users_select on public.users for select to auth_anonymous using(true);
create policy anonymous_users_insert on public.users for insert to auth_anonymous with check(true);

create policy admin_users
  on public.users
  to auth_admin
  using (current_user = 'auth_admin')
  with check (current_user = 'auth_admin');

create policy admin_datasources
  on public.datasources
  to auth_admin
  using (current_user = 'auth_admin')
  with check (current_user = 'auth_admin');

create policy admin_dataschemas
  on public.dataschemas
  to auth_admin
  using (current_user = 'auth_admin')
  with check (current_user = 'auth_admin');

create policy admin_explorations
  on public.explorations
  to auth_admin
  using (current_user = 'auth_admin')
  with check (current_user = 'auth_admin');

create policy admin_dashboards
  on public.dashboards
  to auth_admin
  using (current_user = 'auth_admin')
  with check (current_user = 'auth_admin');

create policy admin_pinned_items
  on public.pinned_items
  to auth_admin
  using (current_user = 'auth_admin')
  with check (current_user = 'auth_admin');

create or replace function public.check_rls(
  entity_id integer
) returns boolean as $$
  begin
    if (entity_id = public.current_user_id() or public.current_team_member_ids() @> ARRAY[entity_id]::int[]) then
      return true;
    else
      return false;
    end if;
  end;
$$ language plpgsql;

create or replace function public.check_rls_by_model(
  entity_id integer,
  table_name text,
  column_name text default 'user_id'
) returns boolean as $$
  declare temp_row record;
  begin
    execute 'select * from public.' ||
      quote_ident(table_name) ||
      ' where id = $1 and ' ||
      quote_ident(column_name) ||
      ' = $2'
    into temp_row
    using entity_id, public.current_user_id();

    if (not found) then
      return false;
    else
      return true;
    end if;
  end;
$$ language plpgsql;

create or replace function public.check_owner_rls(
  user_id integer,
  user_team_id integer
) returns boolean as $$
  begin
    if (
      user_id = public.current_user_id() or
      (select team_role from public.current_user())::text = 'owner' and
      (select team_id from public.current_user())::int = user_team_id
    ) then
      return true;
    else
      return false;
    end if;
  end;
$$ language plpgsql;

create policy user_users
  on public.users
  to auth_user
  using (public.check_owner_rls(id, team_id));

create policy user_datasources
  on public.datasources
  to auth_user
  using (public.check_rls(user_id));

create policy user_dataschemas
  on public.dataschemas
  to auth_user
  using (public.check_rls(user_id))
  with check (public.check_rls(user_id));

create policy user_explorations
  on public.explorations
  to auth_user
  using (public.check_rls(user_id))
  with check (public.check_rls(user_id));

create policy user_dashboards
  on public.dashboards
  to auth_user
  using (public.check_rls(user_id))
  with check (public.check_rls(user_id));

create policy user_pinned_items
  on public.pinned_items
  to auth_user
  using (public.check_rls(user_id))
  with check (public.check_rls(user_id));

-- omitting
-- https://www.graphile.org/postgraphile/smart-comments/#omitting
comment on column public.explorations.id is E'@omit create,update';
comment on column public.explorations.user_id is E'@omit update,all,many';
comment on column public.explorations.datasource_id is E'@omit update,all,many';
comment on column public.explorations.playground_state is E'@omit update,filter';
comment on column public.explorations.created_at is E'@omit create,update,filter';
comment on column public.explorations.updated_at is E'@omit create,update,filter';
comment on table public.explorations is E'@omit update,delete';

comment on column public.datasources.id is E'@omit create,update';
comment on column public.datasources.user_id is E'@omit update';
comment on column public.datasources.created_at is E'@omit create,update,filter';
comment on column public.datasources.updated_at is E'@omit create,update,filter';

comment on column public.dataschemas.id is E'@omit create,update';
comment on column public.dataschemas.user_id is E'@omit update';
comment on column public.dataschemas.datasource_id is E'@omit update';
comment on column public.dataschemas.code is E'@omit filter';
comment on column public.dataschemas.updated_at is E'@omit create,update,filter';
comment on column public.dataschemas.created_at is E'@omit create,update,filter';

comment on table public.users is E'@omit';

comment on table public.teams is E'@omit create,delete';
comment on column public.teams.member_ids is E'@omit create,update,filter';
comment on column public.teams.created_at is E'@omit create,update,filter';
comment on column public.teams.updated_at is E'@omit create,update,filter';
