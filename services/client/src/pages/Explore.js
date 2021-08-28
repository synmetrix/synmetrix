import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Empty, Button } from 'antd';

import Loader from 'components/Loader';
import ContentHeader from 'components/ContentHeader';
import ExploreWorkspace from 'components/ExploreWorkspace';

import useLocation from 'hooks/useLocation';
import useCurrentUserState from 'hooks/useCurrentUserState';
import useSources from 'hooks/useSources';
import usePermissions from 'hooks/usePermissions';

const Explore = (props) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { match } = props;
  const { params = {} } = match;

  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get('tabId');
  const chartId = urlParams.get('chart');

  const [dataSourceId, explorationId, taskId] = (params?.rest || '').split('/');
  const basePath = ['/d/explore', dataSourceId, explorationId].filter(v => !!v).join('/');

  const { currentUserState: currentUser } = useCurrentUserState();

  // const {
  //   lastUsedDataSourceId,
  //   setLastUsedDataSourceId
  // } = useAuth();

  // useEffect(() => {
  //   if (dataSourceId && lastUsedDataSourceId !== dataSourceId) {
  //     setLastUsedDataSourceId(dataSourceId);
  //   }
  // }, [dataSourceId, lastUsedDataSourceId, setLastUsedDataSourceId]);

  const {
    current: dataSource,
    queries: {
      currentData: {
        fetching: loadingDataSource
      },
      execQueryCurrent: loadDataSource,
    },
  } = useSources({
    params: {
      editId: dataSourceId,
    },
    pauseQueryAll: true,
  });

  useEffect(() => {
    if (currentUser?.dataschemas) {
      loadDataSource({ requestPolicy: 'network-only' });
    }
  }, [currentUser.dataschemas, loadDataSource]);

  const onChange = useCallback((key = dataSource.id) => {
    setLocation(`/d/explore/${key}`);
  }, [dataSource.id, setLocation]);

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
            selectedId={dataSource.id}
            title={dataSource.name || 'Select DataSource'}
            entities={currentUser?.datasources}
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
  match: PropTypes.object,
};

Explore.defaultProps = {
  match: {},
};

export default Explore;
