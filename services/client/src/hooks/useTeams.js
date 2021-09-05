import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from 'urql';
import useCurrentTeamState from './useCurrentTeamState';

import useCurrentUser from './useCurrentUser';

const newTeamMutation = `
  mutation CreateTeam($name: String!) {
    create_team(name: $name) {
      teamId
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
      name
    }
  }
`;

const editTeamQuery = `
  query ($id: uuid!) {
    teams_by_pk(id: $id) {
      id
      created_at
      updated_at
      members {
        user {
          display_name
        }
      }
    }
  }
`;

const role = 'user';
export default (props = {}) => {
  const { params = {} } = props;
  const { editId } = params;

  const { queries: { execQueryCurrentUser } } = useCurrentUser();
  const { setCurrentTeamState } = useCurrentTeamState();

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

  useEffect(() => {
    if (createMutation?.data) {
      execQueryCurrentUser();
    }

    if (updateMutation?.data) {
      const team = updateMutation?.data?.update_teams_by_pk;
      setCurrentTeamState(team);
      execQueryCurrentUser();
    }
  }, [
    createMutation.data,
    execQueryCurrentUser,
    updateMutation.data,
    setCurrentTeamState
  ]);

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
