import { useCallback, useEffect, useMemo } from 'react';
import { message } from 'antd';

import nanoid from 'nanoid';
import { get, getOr } from 'unchanged';
import { useQuery, useMutation } from 'urql';
import useLocation from 'wouter/use-location';

import trackEvent from 'utils/trackEvent';

import useAuthContext from './useAuthContext';

const newDashboardMutation = `
  mutation NewDashboardMutation($input: CreateDashboardInput!) {
    createDashboard(input: $input) {
      dashboard {
        id
        rowId
        name
      }
    }
  }
`;

const updateDashboardMutation = `
  mutation UpdateDashboardMutation($input: UpdateDashboardInput!) {
    updateDashboard(input: $input) {
      dashboard {
        id
        rowId
        name
        layout
      }
    }
  }
`;

const editDashboardQuery = `
  query EditDashboardQuery($rowId: Int!) {
    dashboardByRowId(rowId: $rowId) {
      id
      rowId
      name
      layout
      pinnedItemsByDashboardId {
        nodes {
          rowId
        }
      }
    }
  }
`;

const dashboardsQuery = `
  query DashboardsQuery {
    allDashboards {
      nodes {
        id
        rowId
        name
      }
    }
    allDatasources {
      nodes {
        rowId
      }
    }
  }
`;

const deleteDashboardMutation = `
  mutation DeleteDashboardMutation($input: DeleteDashboardInput!) {
    deleteDashboard(input: $input) {
      deletedDashboardId
    }
  }
`;

export default ({ editId, pauseQueryAll = false }) => {
  const [, setLocation] = useLocation();
  const currentUser = useAuthContext();

  const [createMutation, executeNewMutation] = useMutation(newDashboardMutation);
  const mExecuteNewMutation = useCallback(dashboard => {
    const clientMutationId = nanoid();
    trackEvent('Create dashboard');

    executeNewMutation({
      input: {
        clientMutationId,
        dashboard: {
          ...dashboard,
          userId: currentUser.userId,
        },
      }
    });
  }, [currentUser.userId, executeNewMutation]);

  const [updateMutation, execUpdateMutation] = useMutation(updateDashboardMutation);
  const mExecUpdateMutation = useCallback((id, dashboardPatch) => {
    execUpdateMutation({
      input: {
        id,
        dashboardPatch,
      },
    });
  }, [execUpdateMutation]);

  const [allData, executeQueryAll] = useQuery({
    query: dashboardsQuery,
    pause: true,
    requestPolicy: 'network-only'
  });

  useEffect(() => {
    if (!pauseQueryAll) {
      executeQueryAll();
    }
  }, [pauseQueryAll, executeQueryAll]);

  const all = useMemo(() => getOr([], 'data.allDashboards.nodes', allData), [allData]);

  const [currentData, executeQueryCurrent] = useQuery({
    query: editDashboardQuery,
    variables: {
      rowId: parseInt(editId, 10),
    },
    pause: true,
    requestPolicy: 'network-only',
  });

  const current = useMemo(() => get('data.dashboardByRowId', currentData) || {}, [currentData]);

  const [deleteMutation, executeDeleteMutation] = useMutation(deleteDashboardMutation);
  const mExecuteDeleteMutation = useCallback(id => {
    trackEvent('Delete Dashboard');

    executeDeleteMutation({
      input: { id },
    });
  }, [executeDeleteMutation]);

  useEffect(() => {
    if (editId) {
      executeQueryCurrent();
    }
  }, [editId, executeQueryCurrent]);

  useEffect(() => {
    if (currentData.error) {
      message.error(currentData.error.message);
    }
  }, [currentData, currentData.error]);

  const onChange = useCallback((key) => {
    setLocation(`/d/dashboards/${key}`);
  }, [setLocation]);

  const getItemGridData = useCallback((itemId) => {
    const defaultGridData = {
      x: 0,
      y: 0,
      w: 4,
      h: 6,
      minW: 2,
      minH: 4
    };

    if (!current.layout) {
      return {
        ...defaultGridData,
      };
    }

    const itemGridData = current.layout?.find((v) => parseInt(v.i, 10) === itemId);

    if (!itemGridData) {
      let lowest = 0;
      let lastKey = 0;

      current.layout.forEach((item, i) => {
        if (item.y > lowest) {
          lowest = item.y;
          lastKey = i;
        }
      });

      return {
        ...defaultGridData,
        y: lowest + getOr(6, `layout[${lastKey}].h`, current)
      };
    }
    return itemGridData;
  }, [current]);

  return {
    all,
    current,
    onChange,
    getItemGridData,
    queries: {
      allData, executeQueryAll,
      currentData, executeQueryCurrent,
    },
    mutations: {
      createMutation, mExecuteNewMutation,
      updateMutation, mExecUpdateMutation,
      deleteMutation, mExecuteDeleteMutation
    },
  };
};
