/* eslint-disable no-param-reassign */
import { useMemo } from 'react';
import produce from 'immer';

import useSources, { datasourceMetaQuery } from 'hooks/useSources';

const formItems = {
  datasource_id: {
    label: 'Datasource',
    required: true,
    display: 'select',
    span: 24,
  },
  username: {
    label: 'Username',
    required: true,
    display: 'text',
    type: 'string',
    span: 12,
  },
  password: {
    label: 'Password',
    required: true,
    display: 'password',
    type: 'string',
    span: 12,
  },
};

export default ({ form }) => {
  const { all: allDatasources } = useSources({ pauseQueryAll: false });

  const config = useMemo(
    () => {
      const defaultConfig = { ...formItems };
      const datasourceSelectorValues = allDatasources?.map(ds => ({ [ds.name]: ds.id })) || [];

      return produce(defaultConfig, draft => {
        draft.datasource_id.values = datasourceSelectorValues;
      });
    },
    [allDatasources]
  );

  return config;
};
