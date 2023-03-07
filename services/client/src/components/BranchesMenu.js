import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import { useTranslation } from 'react-i18next';
import useLocation from 'hooks/useLocation';
import SelectWithInput from './SelectWithInput';
import PopoverButton from './PopoverButton';


const BranchesMenu = ({ onChange, onCreate, onSetDefault, currentBranch }) => {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
    
  const IsBranchActive = currentBranch?.status !== 'active';

  return (
    <div style={{ padding: '0 10px' }}>
      <div style={{ padding: '5px 0' }}>
        <SelectWithInput
          title={t('Branch')}
          placeholder={t('Select branch')}
          onChange={onChange}
          onCreate={onCreate}
        />
        <PopoverButton
          type="dropdown"
          iconType="more"
          // visible={moreMenuVisible}
          // onVisibleChange={(vis) => setMoreMenuVisible(vis)}
          // overlay={(
          //   <MenuView 
          //     mode={null}
          //     nodes={moreMenu}
          //     selectable={false}
          //     onClick={() => setMoreMenuVisible(false)}
          //   />
          // )}
          trigger={['click']}
        />
      </div>
      <div style={{ padding: '5px 0' }} onClick={() => setLocation(`${basePath}/${dataSourceId}/versions`)}>
        Show versions
      </div>
      {IsBranchActive && (
        <Button onClick={onSetDefault}>{t('Set default branch')}</Button>
      )}
    </div>
  );
};

BranchesMenu.propTypes = {
  onChange: PropTypes.func,
  onCreate: PropTypes.func,
  onSetDefault: PropTypes.func,
  currentBranch: PropTypes.object,
};

BranchesMenu.defaultProps = {
  onChange: () => {},
  onCreate: () => {},
  onSetDefault: () => {},
  currentBranch: {},
};

export default BranchesMenu;