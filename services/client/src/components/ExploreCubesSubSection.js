import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Icon, Collapse } from 'antd';

import s from './ExploreCubesSubSection.module.css';

const { Panel } = Collapse;

const ExploreCubesSubSection = ({ name, haveSelected, children }) => {
  const [openedSubSection, setOpenedSubSection] = useState(false);

  return (
    <Collapse
      bordered={false}
      activeKey={openedSubSection}
      defaultActiveKey={openedSubSection}
      onChange={setOpenedSubSection}
      className={s.subSection}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
    >
      <Panel
        key={name}
        header={name}
        className={s.panelSubSection}
        extra={haveSelected && <div>•</div>}
      >
        {children}
      </Panel>
    </Collapse>
  );
};

ExploreCubesSubSection.propTypes = {
  name: PropTypes.string.isRequired,
  haveSelected: PropTypes.bool,
  children: PropTypes.object.isRequired,
};

ExploreCubesSubSection.defaultProps = {
  haveSelected: false
};

export default ExploreCubesSubSection;
