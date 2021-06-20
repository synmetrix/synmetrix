import { useCallback, useMemo, useEffect } from 'react';

import { get, getOr } from 'unchanged';

import nanoid from 'nanoid';

import useLocation from 'wouter/use-location';
import { useQuery, useMutation } from 'urql';
import { message } from 'antd';

import trackEvent from 'utils/trackEvent';

import useAuthContext from './useAuthContext';

const newExplorationMutation = `
  mutation NewExplorationMutation($input: CreateExplorationInput!) {
    createExploration(input: $input) {
      explorationEdge {
        node {
          id
          slug
        }
      }
    }
  }
`;

const editExplorationQuery = `
  query EditExplorationQuery($slug: String!, $rowsLimit: Int, $offset: Int) {
    explorationBySlug(slug: $slug) {
      id
      rowId
      datasourceId
      playgroundState
      playgroundSettings
      slug
      dataCube(limit: $rowsLimit, offset: $offset) {
        data
        hitLimit
        annotation {
          skippedMembers
          measures
          dimensions
          timeDimensions
          segments
        }
        progress {
          loading
          stage
          timeElapsed
          error
        }
        resourcesAdvice {
          CPURate
          RAMRate
        }
      }
      rawSql {
        sql
      }
      createdAt
    }
  }
`;

// TODO: add isPublic and expirationTime for explorations: allow user to share their queries
const explorationsQuery = `
  query explorationsQuery($first: Int, $offset: Int) {
    allExplorations(
      orderBy: CREATED_AT_DESC,
      first: $first,
      offset: $offset
    ) {
      nodes {
        id
        rowId
        datasourceId,
        slug
        createdAt
      }
    }
  }
`;

export default ({ dataSourceId, editId, pauseQueryAll, pauseQueryCurrent, rowsLimit, offset }) => {
  const [, setLocation] = useLocation();
  const currentUser = useAuthContext();

  const [createMutation, executeNewMutation] = useMutation(newExplorationMutation);
  const mExecuteNewMutation = useCallback(exploration => {
    const clientMutationId = nanoid();

    trackEvent('Create exploration');

    executeNewMutation({
      input: {
        clientMutationId,
        exploration: {
          ...exploration,
          // inner postgraphile column
          userId: currentUser.userId,
          datasourceId: dataSourceId,
        },
      }
    });
  }, [dataSourceId, currentUser.userId, executeNewMutation]);

  const [allData, executeQueryAll] = useQuery({
    query: explorationsQuery,
    pause: !!pauseQueryAll,
    variables: {
      fisrt: 50,
    }
  });

  useEffect(() => {
    if (!pauseQueryAll) {
      executeQueryAll();
    }
  }, [pauseQueryAll, executeQueryAll]);

  const [currentData, executeQueryCurrent] = useQuery({
    query: editExplorationQuery,
    variables: {
      slug: editId,
      rowsLimit: rowsLimit ? parseInt(rowsLimit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    },
    pause: true,
  });

  const current = useMemo(
    () => get('data.explorationBySlug', currentData) || {},
    [currentData]
  );

  const currentProgress = useMemo(
    () => get('data.explorationBySlug.dataCube.progress', currentData) || {},
    [currentData]
  );

  useEffect(() => {
    if (editId && !pauseQueryCurrent) {
      trackEvent('Query current exploration');
      executeQueryCurrent();
    }
  }, [editId, executeQueryCurrent, pauseQueryCurrent]);

  useEffect(() => {
    if (currentData.error) {
      message.error(currentData.error.message);
      currentData.error = null;
    }
  }, [currentData.error, executeQueryCurrent]);

  useEffect(() => {
    if (currentProgress && currentProgress.loading) {
      executeQueryCurrent({ requestPolicy: 'network-only' });
    }
  }, [currentProgress, executeQueryCurrent]);

  const reset = useCallback(
    (explorationId) => setLocation(`/d/explore/${dataSourceId}/${explorationId}`),
    [dataSourceId, setLocation],
  );

  useEffect(() => {
    if (createMutation.data) {
      const { slug } = getOr({}, 'createExploration.explorationEdge.node', createMutation.data);

      reset(slug);
      createMutation.data = null;
    }
  }, [createMutation.data, reset]);

  return {
    current,
    currentProgress,
    queries: {
      allData, executeQueryAll,
      currentData, executeQueryCurrent,
    },
    mutations: {
      createMutation, mExecuteNewMutation,
    },
    reset,
  };
};
