import { useMemo, useCallback, useEffect } from 'react';
import { message } from 'antd';

import { get, getOr } from 'unchanged';
import nanoid from 'nanoid';

import { useQuery, useMutation } from 'urql';
import trackEvent from 'utils/trackEvent';

import { useRecoilValue } from 'recoil';
import { currentUser as currentUserState } from 'recoil/currentUser';

const newDataSourceMutation = `
  mutation NewDataSourceMutation($input: CreateDatasourceInput!) {
    createDatasource(input: $input) {
      datasourceEdge {
        node {
          rowId
        }
      }
    }
  }
`;

const editDataSourceMutation = `
  mutation EditDataSourceMutation($input: UpdateDatasourceInput!) {
    updateDatasource(input: $input) {
      datasource {
        id
        name
        dbType
      }
    }
  }
`;

// TODO: hide crypted dbParams in Vault or something similar
const editDataSourceQuery = `
  query EditDataSourceQuery($rowId: Int!) {
    datasourceByRowId(rowId: $rowId) {
      id
      rowId
      name
      dbType
      dbParams
      cubes
    }
  }
`;

const dataSourcesQuery = `
  query DataSourcesQuery($first: Int, $offset: Int)  {
    allDatasources(first: $first, offset: $offset) {
      totalCount
      nodes {
        id
        rowId
        name
        dbType
        updatedAt
        createdAt
      }
    }
  }
`;

const allTablesQuery = `
  query allTablesQuery($dataSourceId: Int!) {
    allDatasourceTables(dataSourceId: $dataSourceId)
  }
`;

const deleteDatasourceMutation = `
  mutation DeleteDataSourceMutation($input: DeleteDatasourceInput!) {
    deleteDatasource(input: $input) {
      deletedDatasourceId
    }
  }
`;

const testDatasourceMutation = `
  mutation TestDatasourceMutation($input: TestConnectionInput!) {
    testConnection(input: $input) {
      message
    }
  }
`;

const runSQLDatasourceMutation = `
  mutation RunSQLDatasourceMutation($input: RunSQLInput!) {
    runSQL(input: $input)
  }
`;

export default ({ editId, pauseQueryAll, paginationVars }) => {
  const currentUser = useRecoilValue(currentUserState);

  const [createMutation, executeNewMutation] = useMutation(newDataSourceMutation);
  const mExecuteNewMutation = datasource => {
    const clientMutationId = nanoid();

    trackEvent('Create DataSource');

    executeNewMutation({
      input: {
        clientMutationId,
        datasource: {
          ...datasource,
          userId: currentUser.userId,
        },
      }
    });
  };

  const [allData, executeQueryAll] = useQuery({
    query: dataSourcesQuery,
    pause: true,
    variables: paginationVars || {},
  });

  const all = useMemo(() => getOr([], 'data.allDatasources.nodes', allData), [allData]);
  const totalCount = useMemo(() => get('data.allDatasources.totalCount', allData), [allData]);

  useEffect(() => {
    if (!pauseQueryAll) {
      executeQueryAll({ requestPolicy: 'cache-and-network' });
    }
  }, [pauseQueryAll, executeQueryAll]);

  const [currentData, executeQueryCurrent] = useQuery({
    query: editDataSourceQuery,
    variables: {
      rowId: parseInt(editId, 10),
    },
    pause: true,
  });

  const current = useMemo(() => get('data.datasourceByRowId', currentData) || {}, [currentData]);

  useEffect(() => {
    if (editId) {
      executeQueryCurrent({ requestPolicy: 'cache-and-network' });
    }
  }, [editId, executeQueryCurrent]);

  useEffect(() => {
    if (currentData.error) {
      message.error(currentData.error.message);
    }
  }, [currentData, currentData.error]);

  const [tablesData, execQueryTables] = useQuery({
    query: allTablesQuery,
    variables: {
      dataSourceId: current.rowId,
    },
    pause: true,
  });

  const [editMutation, executeEditMutation] = useMutation(editDataSourceMutation);
  const mExecuteEditMutation = useCallback(datasourcePatch => {
    const id = get('data.datasourceByRowId.id', currentData);

    trackEvent('Edit DataSource');

    executeEditMutation({
      input: {
        id,
        datasourcePatch,
      },
    });
  }, [executeEditMutation, currentData]);

  const [deleteMutation, executeDeleteMutation] = useMutation(deleteDatasourceMutation);
  const mExecuteDeleteMutation = useCallback(id => {
    trackEvent('Delete DataSource');

    executeDeleteMutation({
      input: { id },
    });
  }, [executeDeleteMutation]);

  const [testMutation, executeTestMutation] = useMutation(testDatasourceMutation);
  const mExecuteTestMutation = useCallback(
    dataSourceId => {
      trackEvent('Test Connection');

      executeTestMutation({
        input: { dataSourceId },
      });
    },
    [executeTestMutation]
  );

  const [runSQLMutation, execRunSQLMutation] = useMutation(runSQLDatasourceMutation);
  const mExecRunSQLMutation = useCallback(
    (dataSourceId, query, limit) => {
      trackEvent('Run SQL');

      execRunSQLMutation({
        input: { dataSourceId, query, limit },
      });
    },
    [execRunSQLMutation]
  );

  return {
    all,
    current,
    totalCount,
    queries: {
      allData, executeQueryAll,
      currentData, executeQueryCurrent,
      tablesData, execQueryTables,
    },
    mutations: {
      createMutation, mExecuteNewMutation,
      editMutation, mExecuteEditMutation,
      deleteMutation, mExecuteDeleteMutation,
      testMutation, mExecuteTestMutation,
      runSQLMutation, mExecRunSQLMutation,
    },
  };
};
