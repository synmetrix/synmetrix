import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTrackedEffect } from 'ahooks';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Empty, Button } from 'antd';

import equals from 'utils/equals';
import Loader from 'components/Loader';
import ContentHeader from 'components/ContentHeader';
import ExploreWorkspace from 'components/ExploreWorkspace';
import ErrorFound from 'components/ErrorFound';

import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';
import useCurrentUserState from 'hooks/useCurrentUserState';
import useSources from 'hooks/useSources';
import usePermissions from 'hooks/usePermissions';

const Explore = (props) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const { match } = props;
  const { params = {} } = match;

  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get('tabId');
  const chartId = urlParams.get('chart');
  const screenshotMode = urlParams.get('screenshot') === '1';

  const [dataSourceId, explorationId] = (params?.rest || '').split('/');
  const basePath = [withAuthPrefix('/explore'), dataSourceId, explorationId].filter(v => !!v).join('/');

  const { currentUserState: currentUser } = useCurrentUserState();

  const {
    current,
    currentMeta,
    queries: {
      metaData,
      currentData,
      execQueryMeta,
    },
  } = useSources({
    params: {
      editId: dataSourceId,
    },
    pauseQueryAll: true,
  });

  const fetching = currentData.fetching || metaData.fetching;

  useTrackedEffect((changes, previousDeps, currentDeps) => {
    const prevData = previousDeps?.[0];
    const currData = currentDeps?.[0];

    let dataDiff = false;
    if (!prevData || !currData) {
      dataDiff = false;
    } else {
      dataDiff = !equals(prevData, currData);
    }

    if (dataDiff) {
      execQueryMeta({ requestPolicy: 'network-only' });
    }
  }, [currentUser.dataschemas, execQueryMeta]);

  useEffect(() => {
    if (dataSourceId) {
      execQueryMeta({ requestPolicy: 'network-only' });
    }
  }, [dataSourceId, execQueryMeta]);

  const onChange = useCallback((key = current.id) => {
    setLocation(withAuthPrefix(`/explore/${key}`));
  }, [current.id, setLocation, withAuthPrefix]);

  const { fallback } = usePermissions({ scope: 'explore' });
  if (fallback) {
    return fallback;
  }

  if (currentData?.data?.datasources_by_pk === null) {
    return <ErrorFound status={404} />;
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
          <Link to={withAuthPrefix('/sources')}>
            {t('Connect Now')}
          </Link>
        </Button>
      </Empty>
    );
  }

  return (
    <Loader spinning={fetching}>
      <ExploreWorkspace
        basePath={basePath}
        header={(
          <ContentHeader
            selectedId={current.id}
            title={current.name || 'Select DataSource'}
            entities={currentUser?.datasources}
            onChange={onChange}
          />
        )}
        source={current}
        meta={currentMeta}
        params={({
          dataSourceId,
          explorationId,
          tabId,
          chartId,
          screenshotMode,
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
