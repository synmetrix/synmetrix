import { useEffect, useMemo } from 'react';

import { useSetState } from 'ahooks';
import useQuery from './useQuery';
import useMutation from './useMutation';

const newExplorationMutation = `
  mutation ($object: explorations_insert_input!) {
    insert_explorations_one(object: $object) {
      id
    }
  }
`;

const genExplorationSqlMutation = `
  mutation ($exploration_id: uuid!) {
    gen_sql(exploration_id: $exploration_id) {
      result
    }
  }
`;

const editExplorationQuery = `
  query ($id: uuid!, $offset: Int, $limit: Int) {
    explorations_by_pk(id: $id) {
      id
      playground_state
      playground_settings
      created_at
      updated_at
    }
    fetch_dataset(exploration_id: $id, offset: $offset, limit: $limit) {
      annotation
      data
      query
      progress
      hitLimit
    }
  }
`;

const role = 'user';
export default ({ params = {} }) => {
  const [{ editId, offset, limit }, updateParams] = useSetState(params);

  const [createMutation, execCreateMutation] = useMutation(newExplorationMutation, { role });
  const [genSqlMutation, execGenSqlMutation] = useMutation(genExplorationSqlMutation, { role });

  useEffect(() => {
    updateParams({
      editId: params.editId,
      offset: params.offset,
      limit: params.limit,
    });
  }, [params.editId, params.limit, params.offset, updateParams]);

  const [currentData, execQueryCurrent] = useQuery({
    query: editExplorationQuery,
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

  const current = useMemo(() => currentData.data?.explorations_by_pk || {}, [currentData.data]);
  const currentProgress = useMemo(
    () => currentData.data?.fetch_dataset.progress || {},
    [currentData.data]
  );

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
      genSqlMutation,
      execGenSqlMutation,
      createMutation,
      execCreateMutation,
    },
  };
};
