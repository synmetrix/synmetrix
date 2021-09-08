CREATE OR REPLACE FUNCTION create_constraint_if_not_exists (t_name text, c_name text, constraint_sql text)
  RETURNS void
AS
$BODY$
  BEGIN
    -- Look for our constraint
    IF NOT EXISTS (SELECT constraint_name
                   FROM information_schema.constraint_column_usage
                   WHERE constraint_name = c_name) THEN
        EXECUTE 'ALTER TABLE ' || t_name || ' ADD CONSTRAINT ' || c_name || ' ' || constraint_sql;
    END IF;
  END;
$BODY$
LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;

SELECT create_constraint_if_not_exists('auth.account_providers', 'account_providers_account_id_auth_provider_key', 'UNIQUE (account_id, auth_provider);');
SELECT create_constraint_if_not_exists('auth.account_providers', 'account_providers_auth_provider_auth_provider_unique_id_key', 'UNIQUE (auth_provider, auth_provider_unique_id);');
SELECT create_constraint_if_not_exists('auth.account_providers', 'account_providers_pkey', 'PRIMARY KEY (id);');
SELECT create_constraint_if_not_exists('auth.account_roles', 'account_roles_pkey', 'PRIMARY KEY (id);');
SELECT create_constraint_if_not_exists('auth.accounts', 'accounts_email_key', 'UNIQUE (email);');
SELECT create_constraint_if_not_exists('auth.accounts', 'accounts_new_email_key', 'UNIQUE (new_email);');
SELECT create_constraint_if_not_exists('auth.accounts', 'accounts_pkey', 'PRIMARY KEY (id);');
SELECT create_constraint_if_not_exists('auth.accounts', 'accounts_user_id_key', 'UNIQUE (user_id);');
SELECT create_constraint_if_not_exists('auth.providers', 'providers_pkey', 'PRIMARY KEY (provider);');
SELECT create_constraint_if_not_exists('auth.refresh_tokens', 'refresh_tokens_pkey', 'PRIMARY KEY (refresh_token);');
SELECT create_constraint_if_not_exists('auth.roles', 'roles_pkey', 'PRIMARY KEY (role);');
SELECT create_constraint_if_not_exists('auth.account_roles', 'user_roles_account_id_role_key', 'UNIQUE (account_id, role);');
SELECT create_constraint_if_not_exists('public.users', 'users_pkey', 'PRIMARY KEY (id);');
SELECT create_constraint_if_not_exists('auth.account_providers', 'account_providers_account_id_fkey', 'FOREIGN KEY (account_id) REFERENCES auth.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;');
SELECT create_constraint_if_not_exists('auth.account_providers', 'account_providers_auth_provider_fkey', 'FOREIGN KEY (auth_provider) REFERENCES auth.providers(provider) ON UPDATE RESTRICT ON DELETE RESTRICT;');
SELECT create_constraint_if_not_exists('auth.account_roles', 'account_roles_account_id_fkey', 'FOREIGN KEY (account_id) REFERENCES auth.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;');
SELECT create_constraint_if_not_exists('auth.account_roles', 'account_roles_role_fkey', 'FOREIGN KEY (role) REFERENCES auth.roles(role) ON UPDATE CASCADE ON DELETE RESTRICT;');
SELECT create_constraint_if_not_exists('auth.accounts', 'accounts_default_role_fkey', 'FOREIGN KEY (default_role) REFERENCES auth.roles(role) ON UPDATE CASCADE ON DELETE RESTRICT;');
SELECT create_constraint_if_not_exists('auth.accounts', 'accounts_user_id_fkey', 'FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;');
SELECT create_constraint_if_not_exists('auth.refresh_tokens', 'refresh_tokens_account_id_fkey', 'FOREIGN KEY (account_id) REFERENCES auth.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;');

DROP TRIGGER IF EXISTS set_auth_account_providers_updated_at ON auth.account_providers;
CREATE TRIGGER set_auth_account_providers_updated_at BEFORE UPDATE ON auth.account_providers FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS set_auth_accounts_updated_at ON auth.accounts;
CREATE TRIGGER set_auth_accounts_updated_at BEFORE UPDATE ON auth.accounts FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS set_public_users_updated_at ON public.users;
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

INSERT INTO auth.roles (role)
    VALUES ('user'), ('anonymous'), ('me') ON CONFLICT DO NOTHING;

INSERT INTO auth.providers (provider)
    VALUES ('github'), ('facebook'), ('twitter'), ('google'), ('apple'),  ('linkedin'), ('windowslive'), ('spotify') ON CONFLICT DO NOTHING;
