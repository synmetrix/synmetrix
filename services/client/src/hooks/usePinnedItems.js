import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from 'urql';

const newPinnedItemMutation = `
  mutation ($object: dataschemas_insert_input!) {
    insert_dataschemas_one(object: $object) {
      id
      name
    }
  }
`;

const editPinnedItemMutation = `
  mutation (
    $pk_columns: dataschemas_pk_columns_input!,
    $_set: dataschemas_set_input!
  ) {
    update_dataschemas_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const delPinnedItemMutation = `
  mutation ($id: uuid!) {
    delete_dataschemas_by_pk(id: $id) {
      id
    }
  }
`;

const editPinnedItemQuery = `
  query ($id: uuid!) {
    pinned_items_by_pk(id: $id) {
      id
      created_at
      updated_at
    }
  }
`;

const role = 'user';
export default (props = {}) => {
  const { params = {} } = props;
  const { editId } = params;

  const [createMutation, doCreateMutation] = useMutation(newPinnedItemMutation);
  const execCreateMutation = useCallback((input) => {
    return doCreateMutation(input, { role });
  }, [doCreateMutation]);

  const [updateMutation, doUpdateMutation] = useMutation(editPinnedItemMutation);
  const execUpdateMutation = useCallback((input) => {
    doUpdateMutation(input, { role });
  }, [doUpdateMutation]);

  const [deleteMutation, doDeleteMutation] = useMutation(delPinnedItemMutation);
  const execDeleteMutation = useCallback((input) => {
    doDeleteMutation(input, { role });
  }, [doDeleteMutation]);


  const [currentData, doQueryCurrent] = useQuery({
    query: editPinnedItemQuery,
    variables: {
      id: editId,
    },
    pause: true,
  });

  const execQueryCurrent = useCallback((context) => {
    doQueryCurrent({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryCurrent]);

  const current = useMemo(() => currentData.data?.pinned_items_by_pk, [currentData.data]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  return {
    current,
    queries: {
      currentData,
      execQueryCurrent,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
    },
  };
};
