import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from 'urql';

const newTeamMutation = `
  mutation ($object: teams_insert_input!) {
    insert_teams_one(object: $object) {
      id
      name
    }
  }
`;

const editTeamMutation = `
  mutation (
    $pk_columns: teams_pk_columns_input!,
    $_set: teams_set_input!
  ) {
    update_teams_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const editTeamQuery = `
  query ($id: uuid!) {
    teams_by_pk(id: $id) {
      id
      created_at
      updated_at
    }
  }
`;

const role = 'user';
export default (props = {}) => {
  const { params = {} } = props;
  const { editId } = params;

  const [createMutation, doCreateMutation] = useMutation(newTeamMutation);
  const execCreateMutation = useCallback((input) => {
    return doCreateMutation(input, { role });
  }, [doCreateMutation]);

  const [updateMutation, doUpdateMutation] = useMutation(editTeamMutation);
  const execUpdateMutation = useCallback((input) => {
    doUpdateMutation(input, { role });
  }, [doUpdateMutation]);

  const [currentData, doQueryCurrent] = useQuery({
    query: editTeamQuery,
    variables: {
      id: editId,
    },
    pause: true,
  });

  const execQueryCurrent = useCallback((context) => {
    doQueryCurrent({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryCurrent]);

  const current = useMemo(() => currentData.data?.teams_by_pk, [currentData.data]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  return {
    current,
    queries: {
      currentData,
      execQueryCurrent,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      updateMutation,
      execUpdateMutation,
    },
  };
};
