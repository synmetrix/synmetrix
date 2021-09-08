import { useEffect, useMemo } from 'react';

import useQuery from './useQuery';
import useMutation from './useMutation';

const newPinnedItemMutation = `
  mutation ($object: pinned_items_insert_input!) {
    insert_pinned_items_one(object: $object) {
      id
      name
    }
  }
`;

const editPinnedItemMutation = `
  mutation (
    $pk_columns: pinned_items_pk_columns_input!,
    $_set: pinned_items_set_input!
  ) {
    update_pinned_items_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const delPinnedItemMutation = `
  mutation ($id: uuid!) {
    delete_pinned_items_by_pk(id: $id) {
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
      name
      spec
      spec_config
      dashboard {
        id
        layout
        name
      }
      exploration {
        id
        datasource_id
      }
    }
  }
`;

const role = 'user';
export default (props = {}) => {
  const { params = {} } = props;
  const { editId } = params;

  const [createMutation, execCreateMutation] = useMutation(newPinnedItemMutation, { role });
  const [updateMutation, execUpdateMutation] = useMutation(editPinnedItemMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delPinnedItemMutation, { role });

  const [currentData, execQueryCurrent] = useQuery({
    query: editPinnedItemQuery,
    variables: {
      id: editId,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

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
