import { useEffect, useMemo } from 'react';
import { useSubscription } from 'urql';
import { set } from 'unchanged';

import useQuery from './useQuery';
import useMutation from './useMutation';

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

const allSchemasSubscription = `
  subscription ($offset: Int, $limit: Int, $where: dataschemas_bool_exp, $order_by: [dataschemas_order_by!]) {
    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      checksum
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

  if (params.dataSourceId) {
    res = set('where.datasource_id._eq', params.dataSourceId, res);
  }
  
  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default (props = {}) => {
  const { pauseQueryAll, pagination = {}, params = {}, disableSubscription = true } = props;

  const [createMutation, execCreateMutation] = useMutation(newSchemaMutation, { role });
  const [updateMutation, execUpdateMutation] = useMutation(editSchemaMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delSchemaMutation, { role });

  const [allData, execQueryAll] = useQuery({
    query: allSchemasQuery,
    pause: true,
    variables: getListVariables(pagination, params),
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [subscription, execSubscription] = useSubscription({
    query: allSchemasSubscription,
    variables: getListVariables(pagination, params),
    pause: disableSubscription,
  }, handleSubscription);

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.dataschemas || [], [allData.data]);
  const totalCount = useMemo(() => allData.data?.dataschemas_aggregate.aggregate.count, [allData.data]);

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
