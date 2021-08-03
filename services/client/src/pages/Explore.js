import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import useLocation from 'wouter/use-location';
import { useTranslation } from 'react-i18next';

import { getOr } from 'unchanged';

import { Link } from 'wouter';
import { Empty, Button } from 'antd';

import Loader from 'components/Loader';
import ContentHeader from 'components/ContentHeader';
import ExploreWorkspace from 'components/ExploreWorkspace';

import useDataSources from 'hooks/useDataSources';
import useAuth from 'hooks/useAuth';
import useDataSchemasSubscription from 'hooks/useDataSchemasSubscription';
import usePermissions from 'hooks/usePermissions';

const Explore = (props) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get('tabId');
  const chartId = urlParams.get('chart');

  const [dataSourceId, explorationId, taskId] = getOr('', 'params.rest', props).split('/');
  const basePath = ['/d/explore', dataSourceId, explorationId].filter(v => !!v).join('/');

  const {
    lastUsedDataSourceId,
    setLastUsedDataSourceId
  } = useAuth();

  const {
    all: dataSources,
    current: dataSource,
    queries: {
      currentData: {
        fetching: loadingDataSource
      },
      executeQueryCurrent: loadDataSource,
    },
  } = useDataSources({ editId: dataSourceId });

  useDataSchemasSubscription(() => {
    if (dataSourceId) {
      loadDataSource({ requestPolicy: 'network-only' });
    }
  });

  const onChange = useCallback((key = dataSource.rowId) => {
    setLocation(`/d/explore/${key}`);
  }, [dataSource.rowId, setLocation]);

  useEffect(() => {
    if (dataSourceId && lastUsedDataSourceId !== dataSourceId) {
      setLastUsedDataSourceId(dataSourceId);
    }
  }, [dataSourceId, lastUsedDataSourceId, setLastUsedDataSourceId]);

  const { fallback } = usePermissions({ scope: 'explore' });
  if (fallback) {
    return fallback;
  }

  if (!dataSourceId) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        imageStyle={{
          marginTop: 70
        }}
        description={(
          <span>
            {t('Connect your Data Source first')}
          </span>
        )}
      >
        <Button type="primary">
          <Link href="/d/sources">
            {t('Connect Now')}
          </Link>
        </Button>
      </Empty>
    );
  }

  return (
    <Loader spinning={loadingDataSource}>
      <ExploreWorkspace
        basePath={basePath}
        header={(
          <ContentHeader
            rowId={dataSource.rowId}
            title={dataSource.name || 'Select DataSource'}
            entities={dataSources}
            onChange={onChange}
          />
        )}
        dataSource={dataSource}
        loading={loadingDataSource}
        params={({
          dataSourceId,
          explorationId,
          taskId,
          tabId,
          chartId,
        })}
      />
    </Loader>
  );
};

Explore.propTypes = {
  rest: PropTypes.string,
};

Explore.defaultProps = {
  rest: '',
};

export default Explore;
