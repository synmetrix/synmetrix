import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useSubscription } from 'urql';
import { set } from 'unchanged';

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

const validateSchemaMutation = `
  mutation ($id: uuid!) {
    validate_dataschemas_by_pk(id: $id) {
      message
    }
  }
`;

const runSourceSQLMutation = `
  mutation ($datasource_id: uuid!, $query: String!, $limit: Int!) {
    run_sql(datasource_id: $datasource_id, query: $query, limit: $limit) {
      id
    }
  }
`;

const allSchemasSubscription = `
  subscription ($offset: Int, $limit: Int, $where: dataschemas_bool_exp, $order_by: [dataschemas_order_by!]) {
    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
    }
  }
`;

const getListVariables = (pagination, params) => {
  let res = {
    order_by: {
      created_at: 'asc',
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

  const [createMutation, doCreateMutation] = useMutation(newSchemaMutation);
  const execCreateMutation = useCallback((input) => {
    return doCreateMutation(input, { role });
  }, [doCreateMutation]);

  const [updateMutation, doUpdateMutation] = useMutation(editSchemaMutation);
  const execUpdateMutation = useCallback((input) => {
    doUpdateMutation(input, { role });
  }, [doUpdateMutation]);

  const [deleteMutation, doDeleteMutation] = useMutation(delSchemaMutation);
  const execDeleteMutation = useCallback((input) => {
    doDeleteMutation(input, { role });
  }, [doDeleteMutation]);

  const [runSQLMutation, doRunSQLMutation] = useMutation(runSourceSQLMutation);
  const execRunSQLMutation = useCallback((input) => {
    doRunSQLMutation(input, { role });
  }, [doRunSQLMutation]);

  const [validateMutation, doValidateMutation] = useMutation(validateSchemaMutation);
  const execValidateMutation = useCallback((input) => {
    doValidateMutation(input, { role });
  }, [doValidateMutation]);

  const [allData, doQueryAll] = useQuery({
    query: allSchemasQuery,
    pause: true,
    variables: getListVariables(pagination, params),
  });

  const [subscription] = useSubscription({
    query: allSchemasSubscription,
    variables: getListVariables(pagination, params),
    pause: disableSubscription,
  }, handleSubscription);

  const execQueryAll = useCallback((context) => {
    doQueryAll({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryAll]);

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.dataschemas || [], [allData]);
  const totalCount = useMemo(() => allData.data?.dataschemas_aggregate.aggregate.count, [allData]);

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
      runSQLMutation,
      execRunSQLMutation,
      validateMutation,
      execValidateMutation,
    },
    subscription,
  };
};
