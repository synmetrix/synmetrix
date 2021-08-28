import { useCallback, useMemo, useEffect } from 'react';

import nanoid from 'nanoid';
import { useMutation, useQuery } from 'urql';
import { get, getOr } from 'unchanged';

import trackEvent from 'utils/trackEvent';

import { useRecoilValue } from 'recoil';
import { currentUser as currentUserState } from 'recoil/currentUser';

const newPinnedItemMutation = `
  mutation NewPinnedItemMutation($input: CreatePinnedItemInput!) {
    createPinnedItem(input: $input) {
      pinnedItem {
          id
          name
      }
    }
  }
`;

const currentPinnedItemQuery = `
  query CurrentPinnedItem($rowId: Int!) {
    pinnedItemByRowId(rowId: $rowId) {
      id
      rowId
      name
      spec
      specConfig
      explorationByExplorationId {
        datasourceId
        slug
        dataCube {
          data
          progress {
            loading
            stage
            timeElapsed
            error
          }
        }
      }
      dashboardByDashboardId {
        rowId
        name
        layout
      }
    }
  }
`;

const pinnedItemsQuery = `
  query allPinnedItems {
    allPinnedItems {
      nodes {
        id
        rowId
        name
      }
    }
  }
`;

const deletePinnedItemMutation = `
  mutation DeletePinnedItemMutation($input: DeletePinnedItemByRowIdInput!) {
    deletePinnedItemByRowId(input: $input) {
      deletedPinnedItemId
    }
  }
`;

const updatePinnedItemMutation = `
  mutation updatePinnedItem($input: UpdatePinnedItemInput!) {
    updatePinnedItem(input: $input) {
      pinnedItem {
        name
      }
    }
  }
`;

export default ({ rowId }) => {
  const currentUser = useRecoilValue(currentUserState);

  const [createMutation, executeNewMutation] = useMutation(newPinnedItemMutation);
  const mExecuteNewMutation = useCallback(pinnedItem => {
    const clientMutationId = nanoid();
    trackEvent('Create pinned item');

    executeNewMutation({
      input: {
        clientMutationId,
        pinnedItem: {
          ...pinnedItem,
          userId: currentUser.userId,
        },
      }
    });
  }, [currentUser.userId, executeNewMutation]);

  const [allData, executeQueryAll] = useQuery({
    query: pinnedItemsQuery,
    pause: true,
  });

  const all = useMemo(() => getOr([], 'data.allPinnedItems.nodes', allData), [allData]);

  const [currentData, executeQueryCurrent] = useQuery({
    query: currentPinnedItemQuery,
    variables: {
      rowId: parseInt(rowId, 10),
    },
    pause: true,
  });

  const current = useMemo(() => get('data.pinnedItemByRowId', currentData) || {}, [currentData]);
  const currentProgress = useMemo(
    () => get('data.pinnedItemByRowId.explorationByExplorationId.dataCube.progress', currentData) || {},
    [currentData]
  );

  const [deleteMutation, executeDeleteMutation] = useMutation(deletePinnedItemMutation);
  const mExecuteDeleteMutation = useCallback(id => {
    trackEvent('Delete Pinned Item');

    executeDeleteMutation({
      input: { rowId: id },
    });
  }, [executeDeleteMutation]);

  const [updateMutation, execUpdateMutation] = useMutation(updatePinnedItemMutation);
  const mExecUpdateMutation = useCallback((id, input = {}) => {
    execUpdateMutation({
      input: {
        id,
        pinnedItemPatch: input
      },
    });
  }, [execUpdateMutation]);

  useEffect(() => {
    if (rowId || updateMutation.data) {
      executeQueryCurrent({ requestPolicy: 'cache-and-network' });
    }
  }, [rowId, executeQueryCurrent, updateMutation.data]);

  useEffect(() => {
    if (currentProgress && currentProgress.loading) {
      executeQueryCurrent({ requestPolicy: 'network-only' });
    }
  }, [currentProgress, executeQueryCurrent]);

  return {
    all,
    current,
    currentProgress,
    queries: {
      allData, executeQueryAll,
      currentData
    },
    mutations: {
      createMutation, mExecuteNewMutation,
      deleteMutation, mExecuteDeleteMutation,
      updateMutation, mExecUpdateMutation
    },
  };
};
