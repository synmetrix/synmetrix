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

const allSchemasQuery = `
  query ($offset: Int, $limit: Int, $where: dataschemas_bool_exp, $order_by: [dataschemas_order_by!]) {
    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      code
      created_at
      updated_at
    }
    dataschemas_aggregate (where: $where) {
      aggregate {
        count
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
  const { pauseQueryAll, pagination = {}, params = {}, disableSubscription = true } = props;
  const { currentTeamState } = useCurrentTeamState();

  const reqParams = {
    ...params,
    teamId: currentTeamState?.id,
  };

  const [createMutation, execCreateMutation] = useMutation(newSchemaMutation, { role });
  const [updateMutation, execUpdateMutation] = useMutation(editSchemaMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delSchemaMutation, { role });

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

  const all = useMemo(() => allData.data?.dataschemas || [], [allData.data]);
  const totalCount = useMemo(() => allData.data?.dataschemas_aggregate.aggregate.count, [allData.data]);

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
    totalCount,
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
    },
    subscription,
    execSubscription,
  };
};
