import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PopoverButton from './PopoverButton';
import MenuView from './MenuView';

const MoreMenu = ({ menuNodes }) => {
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);

  return (
    <PopoverButton
      type="dropdown"
      iconType="more"
      visible={moreMenuVisible}
      onVisibleChange={(vis) => setMoreMenuVisible(vis)}
      overlay={(
        <MenuView 
          mode={null}
          nodes={menuNodes}
          selectable={false}
          onClick={() => setMoreMenuVisible(false)}
        />
      )}
      trigger={['click']}
    />
  );
};

MoreMenu.propTypes = {
  menuNodes: PropTypes.array.isRequired,
};

MoreMenu.defaultProps = {
};

export default MoreMenu;