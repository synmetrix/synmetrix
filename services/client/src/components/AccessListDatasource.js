import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import Loader from 'components/Loader';
import AccessPart from 'components/AccessPart';
import { updateMeta } from 'components/DatasourceCard';

import useSources from 'hooks/useSources';

const AccessListDatasource = ({ datasourceId, datasourcePermissions }) => {
  const {
    current,
    currentMeta,
    queries: {
      currentData,
      metaData,
      execQueryMeta,
    },
  } = useSources({
    pauseQueryAll: true,
    params: {
      editId: datasourceId,
    },
  });

  useEffect(() => {
    if (datasourceId) {
      execQueryMeta();
    }
  }, [datasourceId, execQueryMeta]);

  const meta = useMemo(() => updateMeta(currentMeta), [currentMeta]);

  return (
    <Loader spinning={metaData.fetching || currentData.fetching}>
      <Row type="flex" justify="start" align="top" gutter={24} key="1">
        <Col xs={5}>
          {current?.name}
        </Col>
        <Col xs={5}>
          <AccessPart
            datasourceMeta={meta}
            datasourcePermissions={datasourcePermissions}
          />
        </Col>
      </Row>
    </Loader>
  );
};

AccessListDatasource.propTypes = {
  datasourceId: PropTypes.string,
  datasourcePermissions: PropTypes.object,
};

AccessListDatasource.defaultProps = {
  datasourceId: null,
  datasourcePermissions: {},
};

export default AccessListDatasource;