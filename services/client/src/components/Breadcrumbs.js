import React from 'react';
import PropTypes from 'prop-types';

import useLocation from 'hooks/useLocation';
import { Breadcrumb } from 'antd';

const Breadcrumbs = ({ breadcrumbs }) => {
  const [, setLocation] = useLocation();

  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <Breadcrumb separator=">">
      {breadcrumbs.map(bc => (
        <Breadcrumb.Item key={bc.path}>
          <a style={{ cursor: 'pointer' }} onClick={() => setLocation(bc.path)}>
            {bc.title}
          </a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array,
};

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
};

export default Breadcrumbs;
