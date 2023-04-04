import { useEffect, useMemo } from 'react';
import { useSubscription } from 'urql';
import { set } from 'unchanged';
import { useTrackedEffect } from 'ahooks';

import useQuery from './useQuery';
import useMutation from './useMutation';
import useCurrentTeamState from './useCurrentTeamState';

const allSchemasQuery = `
  query ($offset: Int, $limit: Int, $where: branches_bool_exp, $order_by: [branches_order_by!]) {
    branches (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      status
      versions (order_by: {created_at: desc}) {
        id
        checksum
        created_at
        updated_at
        markdown_doc
        user {
          display_name
        }
        dataschemas  {
          id
          name
          code
          created_at
          updated_at
          datasource_id
        }
      }
    }
  }
`;

const delSchemaMutation = `
  mutation ($id: uuid!) {
    update_branches_by_pk(_set: {status: "arhived"}, pk_columns: {id: $id}) {
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
  mutation ($branch_id: String) {
    export_data_models(branch_id: $branch_id) {
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

const newVersionMutation = `
  mutation ($object: versions_insert_input!) {
    insert_versions_one(object: $object) {
      id
    }
  }
`;
const setDefaultBranchMutation = `
  mutation ($branch_id: uuid!, $datasource_id: uuid!) {
    update_branches(_set: {status: "created"}, where: {datasource_id: {_eq: $datasource_id}, status: {_eq: "active"}}) {
      affected_rows
    }

    update_branches_by_pk(_set: {status: "active"}, pk_columns: {id: $branch_id}) {
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

  if (params?.statuses) {
    res = set('where.status._in', params.statuses, res);
  }
  
  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default (props = {}) => {
  const { pauseQueryAll, pagination = {}, params = {}, disableSubscription = true } = props;
  const { currentTeamState } = useCurrentTeamState();

  const reqParams = {
    ...params,
    teamId: currentTeamState?.id,
    statuses: ['active', 'created'],
  };

  const [deleteMutation, execDeleteMutation] = useMutation(delSchemaMutation, { role });
  const [exportMutation, execExportMutation] = useMutation(exportDataMutation, { role });
  const [createBranchMutation, execCreateBranchMutation] = useMutation(newBranchMutation, { role });
  const [createVersionMutation, execCreateVersionMutation] = useMutation(newVersionMutation, { role });
  const [setDefaultMutation, execSetDefaultMutation] = useMutation(setDefaultBranchMutation, { role });

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
      deleteMutation,
      execDeleteMutation,
      exportMutation,
      execExportMutation,
      createBranchMutation,
      execCreateBranchMutation,
      createVersionMutation,
      execCreateVersionMutation,
      setDefaultMutation,
      execSetDefaultMutation,
    },
    subscription,
    execSubscription,
  };
};
