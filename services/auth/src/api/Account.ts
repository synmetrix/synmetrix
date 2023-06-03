import { gql } from "graphql-request";

export const createAccountWithUserMutation = gql`
  mutation InsertAccounts($external_id: uuid, $meta:jsonb) {
    insert_accounts_one(object: {
      external_id: $external_id,
      user: { data: {} }
      meta: $meta
    }) {
      id
    }
  }
`;

export const createAccountMutation = gql`
  mutation InsertAccounts($external_id: uuid, $user_id: uuid, $meta:jsonb) {
    insert_accounts_one(object: {
      external_id: $external_id,
      meta: $meta,
      user_id: $user_id
    }) {
      id
    }
  }
`;

export const getAccountByMetaQuery = gql`
  query GetAccountByEmail($email:String, $service: String) {
    accounts(where: { meta: { _contains: { email: $email, service: $service } } }) {
      id
      user_id
    }
  }
`;

export const getAccountByExternalIdQuery = gql`
  query GetAccountByExternalId($externalId: uuid!) {
    accounts(where: { external_id: { _eq: $externalId } }) {
      id
      user_id
    }
  }
`;
