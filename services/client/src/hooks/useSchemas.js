import { useEffect, useMemo } from 'react';
import { useSubscription } from 'urql';
import { set } from 'unchanged';
import { useTrackedEffect } from 'ahooks';

import useQuery from './useQuery';
import useMutation from './useMutation';
import useCurrentTeamState from './useCurrentTeamState';

const newSchemaMutation = `
  mutation ($object: dataschemas_insert_input!) {
    insert_dataschemas_one(object: $object) {
      id
      name
    }
  }
`;

const newBatchSchemaMutation = `
  mutation ($objects: [dataschemas_insert_input!]!) {
    insert_dataschemas(
      objects: $objects, 
      on_conflict: {
        constraint: dataschemas_datasource_id_branch_name_key, 
        update_columns: [code]
      }
    ) {
      affected_rows
    }
  }
`;

const allSchemasQuery = `
  query ($offset: Int, $limit: Int, $where: branches_bool_exp, $order_by: [branches_order_by!]) {
    branches (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      commits (order_by: {created_at: desc}) {
        id
        checksum
        dataschemas  {
          id
          name
          code
          created_at
          updated_at
        }
      }
    }
  }
`;

const editSchemaMutation = `
  mutation (
    $pk_columns: dataschemas_pk_columns_input!,
    $_set: dataschemas_set_input!
  ) {
    update_dataschemas_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const delSchemaMutation = `
  mutation ($id: uuid!) {
    delete_dataschemas_by_pk(id: $id) {
      id
    }
  }
`;

// TODO: add fragmets
const allSchemasSubscription = `
  subscription ($offset: Int, $limit: Int, $where: dataschemas_bool_exp, $order_by: [dataschemas_order_by!]) {
    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      user_id
      name
      checksum
      datasource {
        team_id
      }
    }
  }
`;

const exportDataMutation = `
  mutation ($team_id: String, $branch: String) {
    export_data_models(team_id: $team_id, branch: $branch) {
      download_url
    }
  }
`;

const newBranchMutation = `
  mutation ($object: branches_insert_input!) {
    insert_branches_one(object: $object) {
      id
    }
  }
`;

const newCommitMutation = `
  mutation ($object: commits_insert_input!) {
    insert_commits_one(object: $object) {
      id
    }
  }
`;

const getListVariables = (pagination, params) => {
  let res = {
    order_by: {
      created_at: 'desc',
    },
  };

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  if (params?.dataSourceId) {
    res = set('where.datasource_id._eq', params.dataSourceId, res);
  }

  if (params?.teamId) {
    res = set('where.datasource.team_id._eq', params.teamId, res);
  }
  
  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default (props = {}) => {
  const { pauseQueryAll, pagination = {}, params = {}, disableSubscription = true, branchId } = props;
  const { currentTeamState } = useCurrentTeamState();

  const reqParams = {
    ...params,
    teamId: currentTeamState?.id,
  };

  const [createMutation, execCreateMutation] = useMutation(newSchemaMutation, { role });
  const [updateMutation, execUpdateMutation] = useMutation(editSchemaMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delSchemaMutation, { role });
  const [exportMutation, execExportMutation] = useMutation(exportDataMutation, { role });
  const [batchMutation, execBatchMutation] = useMutation(newBatchSchemaMutation, { role });
  const [branchMutation, execBranchMutation] = useMutation(newBranchMutation, { role });
  const [commitMutation, execCommitMutation] = useMutation(newCommitMutation, { role });

  const [allData, execQueryAll] = useQuery({
    query: allSchemasQuery,
    pause: true,
    variables: getListVariables(pagination, reqParams),
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [subscription, execSubscription] = useSubscription({
    query: allSchemasSubscription,
    variables: getListVariables(pagination),
    pause: disableSubscription,
  }, handleSubscription);

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.branches || [], [allData.data]);
  // const totalCount = useMemo(() => allData.data?.dataschemas_aggregate.aggregate.count, [allData.data]);

  useTrackedEffect((changes, prevDeps, currDeps) => {
    const prevTeam = prevDeps?.[0];
    const currTeam = currDeps?.[0];
    const currPause = currDeps?.[1];

    if (!currPause && prevTeam && currTeam && prevTeam !== currTeam) {
      execQueryAll();
    }
  }, [currentTeamState.id, pauseQueryAll, execQueryAll]);

  return {
    all,
    // totalCount,
    queries: {
      allData,
      execQueryAll,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
      exportMutation,
      execExportMutation,
      batchMutation,
      execBatchMutation,
      branchMutation,
      execBranchMutation,
      commitMutation,
      execCommitMutation,
    },
    subscription,
    execSubscription,
  };
};
