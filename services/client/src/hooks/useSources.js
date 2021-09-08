import { useEffect, useMemo } from 'react';
import { useSubscription } from 'urql';

import useQuery from './useQuery';
import useMutation from './useMutation';

const newdatasourceMutation = `
  mutation ($object: datasources_insert_input!) {
    insert_datasources_one(object: $object) {
      id
      name
    }
  }
`;

const datasourcesQuery = `
  query ($offset: Int, $limit: Int, $where: datasources_bool_exp, $order_by: [datasources_order_by!]) {
    datasources (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      db_type
      created_at
      updated_at

      dataschemas {
        id
        name
      }
    }
    datasources_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const editdatasourceMutation = `
  mutation (
    $pk_columns: datasources_pk_columns_input!,
    $_set: datasources_set_input!
  ) {
    update_datasources_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const checkdatasourceMutation = `
  mutation (
    $id: uuid!,
  ) {
    check_connection(datasource_id: $id) {
      message
      code
    }
  }
`;

const editdatasourceQuery = `
  query ($id: uuid!) {
    datasources_by_pk(id: $id) {
      id
      name
      db_type
      db_params
      created_at
      updated_at
    }
  }
`;

const datasourceMetaQuery = `
  query ($datasource_id: uuid!) {
    fetch_meta(datasource_id: $datasource_id) {
      cubes
    }
  }
`;

const fetchSourceTablesQuery = `
  query ($id: uuid!) {
    fetch_tables(datasource_id: $id) {
      schema
    }
  }
`;

const deldatasourceMutation = `
  mutation ($id: uuid!) {
    delete_datasources_by_pk(id: $id) {
      id
    }
  }
`;

const datasourcesSubscription = `
  subscription ($offset: Int, $limit: Int, $where: datasources_bool_exp, $order_by: [datasources_order_by!]) {
    datasources (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
    }
  }
`;

const validateSourceMutation = `
  mutation ($id: uuid!) {
    validate_datasource(id: $id) {
      code
      message
    }
  }
`;


const genSourceSchemasMutation = `
  mutation ($datasource_id: uuid!, $tables: [SourceTable!]!, $overwrite: Boolean) {
    gen_dataschemas(datasource_id: $datasource_id, tables: $tables, overwrite: $overwrite) {
      code
      message
    }
  }
`;

const runSourceSQLMutation = `
  mutation ($datasource_id: uuid!, $query: String!, $limit: Int!) {
    run_query(datasource_id: $datasource_id, query: $query, limit: $limit) {
      result
    }
  }
`;

const getListVariables = (pagination) => {
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

  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default ({ pauseQueryAll, pagination = {}, params = {}, disableSubscription = true }) => {
  const { editId } = params;

  const [createMutation, execCreateMutation] = useMutation(newdatasourceMutation, { role });
  const [updateMutation, execUpdateMutation] = useMutation(editdatasourceMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(deldatasourceMutation, { role });
  const [checkMutation, execCheckMutation] = useMutation(checkdatasourceMutation, { role });
  const [genSchemaMutation, execGenSchemaMutation] = useMutation(genSourceSchemasMutation, { role });
  const [runQueryMutation, execRunQueryMutation] = useMutation(runSourceSQLMutation, { role });
  const [validateMutation, execValidateMutation] = useMutation(validateSourceMutation, { role });

  const [allData, execQueryAll] = useQuery({
    query: datasourcesQuery,
    pause: true,
    variables: getListVariables(pagination),
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [metaData, execQueryMeta] = useQuery({
    query: datasourceMetaQuery,
    pause: true,
    variables: {
      datasource_id: editId,
    },
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [subscription, execSubscription] = useSubscription({
    query: datasourcesSubscription,
    variables: getListVariables(pagination),
    pause: disableSubscription,
  }, handleSubscription);

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.datasources || [], [allData.data]);
  const totalCount = useMemo(() => allData.data?.datasources_aggregate.aggregate.count, [allData.data]);

  const [currentData, execQueryCurrent] = useQuery({
    query: editdatasourceQuery,
    variables: {
      id: editId,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const current = useMemo(() => currentData.data?.datasources_by_pk || {}, [currentData.data]);
  const currentMeta = useMemo(() => metaData.data?.fetch_meta?.cubes || [], [metaData.data]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  const [tablesData, execQueryTables] = useQuery({
    query: fetchSourceTablesQuery,
    variables: {
      id: editId,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  return {
    all,
    totalCount,
    current,
    currentMeta,
    queries: {
      allData,
      execQueryAll,
      currentData,
      execQueryCurrent,
      tablesData,
      execQueryTables,
      metaData,
      execQueryMeta,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
      checkMutation,
      execCheckMutation,

      runQueryMutation,
      execRunQueryMutation,
      validateMutation,
      execValidateMutation,
      genSchemaMutation,
      execGenSchemaMutation,
    },
    subscription,
    execSubscription,
  };
};
