DROP FUNCTION IF EXISTS create_constraint_if_not_exists;

DROP TRIGGER IF EXISTS set_auth_account_providers_updated_at ON auth.account_providers;
DROP TRIGGER IF EXISTS set_auth_accounts_updated_at ON auth.accounts;
DROP TRIGGER IF EXISTS set_public_users_updated_at ON public.users;