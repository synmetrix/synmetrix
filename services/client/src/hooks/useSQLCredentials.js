import useMutation from './useMutation';

const newSqlCredentialMutation = `
  mutation ($object: sql_credentials_insert_input!) {
    insert_sql_credentials_one(object: $object) {
      id
    }
  }
`;

const delSqlCredentialMutation = `
  mutation ($id: uuid!) {
    delete_sql_credentials_by_pk(id: $id) {
      id
    }
  }
`;

const role = 'user';
export default () => {
  const [createMutation, execCreateMutation] = useMutation(newSqlCredentialMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delSqlCredentialMutation, { role });

  return {
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
    },
  };
};