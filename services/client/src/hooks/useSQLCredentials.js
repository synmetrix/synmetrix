import { useEffect, useMemo } from 'react';
import useQuery from './useQuery';
import useMutation from './useMutation';

const newSqlCredentialMutation = `
  mutation ($object: sql_credentials_insert_input!) {
    insert_sql_credentials_one(object: $object) {
      id
    }
  }
`;

const editSqlCredentialQuery = `
  query ($id: uuid!, $offset: Int, $limit: Int) {
    sql_credentials_by_pk(id: $id) {
      id
      datasource_id
      user_id
      username
      password
    }
  }
`;

const role = 'user';
export default ({ params = {} }) => {
  const { editId } = params;

  const [createMutation, execCreateMutation] = useMutation(newSqlCredentialMutation, { role });

  const [currentData, execQueryCurrent] = useQuery({
    query: editSqlCredentialQuery,
    variables: {
      id: editId,
      limit,
      offset,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const current = useMemo(() => currentData.data?.sql_credentials_by_pk || {}, [currentData.data]);

  useEffect(() => {
    if (params.editId) {
      execQueryCurrent();
    }
  }, [params.editId, execQueryCurrent]);

  return {
    current,
    currentProgress,
    queries: {
      currentData,
      execQueryCurrent,
    },
    mutations: {
      createMutation,
      execCreateMutation,
    },
  };
};