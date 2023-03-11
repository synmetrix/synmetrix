// import { useEffect, useMemo } from 'react';
// import useQuery from './useQuery';
import useMutation from './useMutation';

const newSqlCredentialMutation = `
  mutation ($object: sql_credentials_insert_input!) {
    insert_sql_credentials_one(object: $object) {
      id
    }
  }
`;

// const editSqlCredentialQuery = `
//   query ($id: uuid!, $offset: Int, $limit: Int) {
//     sql_credentials_by_pk(id: $id) {
//       id
//       datasource_id
//       user_id
//       username
//       password
//     }
//   }
// `;

const role = 'user';
export default () => {
  const [createMutation, execCreateMutation] = useMutation(newSqlCredentialMutation, { role });

  return {
    mutations: {
      createMutation,
      execCreateMutation,
    },
  };
};