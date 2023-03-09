import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import { useTranslation } from 'react-i18next';
import SelectBranch from './SelectBranch';
import MoreMenu from './MoreMenu';


const BranchesMenu = ({ onChange, onCreate, onSetDefault, branchStatus, moreMenu, branches }) => {
  const { t } = useTranslation();

  const IsDefaultBranch = branchStatus === 'active';

  return (
    <div style={{ padding: '0 10px' }}>
      <div style={{ display: 'flex', padding: '5px 0' }}>
        <SelectBranch
          title={t('Branch')}
          placeholder={t('Select branch')}
          onChange={onChange}
          onCreate={onCreate}
          branches={branches}
        />
        <MoreMenu menuNodes={moreMenu} />
      </div>
      {!IsDefaultBranch && (
        <Button onClick={onSetDefault}>{t('Set as default')}</Button>
      )}
    </div>
  );
};

BranchesMenu.propTypes = {
  onChange: PropTypes.func,
  onCreate: PropTypes.func,
  onSetDefault: PropTypes.func,
  branchStatus: PropTypes.string,
  moreMenu: PropTypes.array,
  branches: PropTypes.array,
};

BranchesMenu.defaultProps = {
  onChange: () => {},
  onCreate: () => {},
  onSetDefault: () => {},
  branchStatus: null,
  moreMenu: [],
  branches: [],
};

export default BranchesMenu;