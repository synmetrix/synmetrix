import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Icon, Select, Input, Divider, Button, Typography } from 'antd';

import MoreMenu from './MoreMenu';

const { Option } = Select;
const { Paragraph } = Typography;

const SelectBranch = ({ onChange, onCreate, onSetDefault, branchStatus, currentBranchId, curVersion, moreMenu, branches, loading }) => {
  const { t } = useTranslation();

  const isDefaultBranch = useMemo(() => branchStatus === 'active', [branchStatus]);

  const [state, updateState] = useState({
    selectOpen: false,
    newBranchName: 'New branch',
  });

  const onSelect = useCallback((value) => {
    updateState(prev => ({ ...prev, selectedBranch: value, selectOpen: false }));
    onChange(value);
  }, [updateState, onChange]);

  const onChangeInput = (e) => {
    updateState({ newBranchName: e.target.value });
  };

  const onCreateBranch = () => {
    onCreate(state.newBranchName);
  };

  useEffect(() => {
    if ((!currentBranchId && branches) || (branches.length && !branches.find(b => b.id === currentBranchId))) {
      onChange(branches?.[0]?.id);
    }
  }, [currentBranchId, branches, onChange]);

  const options = useMemo(() => branches?.map((item) => (
    <Option 
      key={item.id}
    >
      {item.name}{item.status === 'active' && ' - default'}
    </Option>
  )), [branches]);

  return (
    <div style={{ padding: '10px', maxWidth: '100%' }}>
      <div style={{ paddingBottom: '10px' }}>
        {t('Branch')}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <div 
          style={{ flex: 1 }}
          onClick={() => updateState(prev => ({ ...prev, selectOpen: !state.selectOpen }))}
        >
          <Select
            style={{ width: '100%', cursor: 'pointer' }}
            placeholder={t('Select branch')}
            open={state.selectOpen}
            loading={loading}
            onSelect={onSelect}
            defaultValue={currentBranchId}
            dropdownRender={menu => (
              <div
                onMouseLeave={() => updateState(prev => ({ ...prev, selectOpen: false }))}
                style={{  marginTop: '-50px', paddingTop: '50px', cursor: 'pointer'  }}
              >
                {menu}
                <Divider style={{ margin: '0' }} />
                <div
                  style={{ padding: '4px 8px' }}
                >
                  <Input
                    value={state.newBranchName}
                    onChange={onChangeInput}
                    onClick={e => e.stopPropagation()}
                    disabled={loading}
                    maxLength={20}
                    addonAfter={(
                      <Icon
                        onClick={onCreateBranch}
                        type={loading ? 'loading' : 'plus'}
                      />
                    )}
                  />
                </div>
              </div>
            )}
          >
            {options}
          </Select>
        </div>
        <MoreMenu menuNodes={moreMenu} />
      </div>
      {curVersion && (
        <div style={{ paddingTop: '5px' }}>
          <Paragraph ellipsis>{t('Version')}: {curVersion}</Paragraph>
        </div>
      )}
      {!isDefaultBranch && (
        <div style={{ margin: '10px 0' }}>
          <Button onClick={onSetDefault}>{t('Set as default')}</Button>
        </div>
      )}
    </div>
  );
};


SelectBranch.propTypes = {
  onChange: PropTypes.func,
  onCreate: PropTypes.func,
  onSetDefault: PropTypes.func,
  branchStatus: PropTypes.string,
  moreMenu: PropTypes.array,
  loading: PropTypes.bool,
  branches: PropTypes.array,
  currentBranchId: PropTypes.string,
  curVersion: PropTypes.string,
};

SelectBranch.defaultProps = {
  onChange: () => {},
  onCreate: () => {},
  onSetDefault: () => {},
  branchStatus: null,
  moreMenu: [],
  loading: false,
  branches: [],
  currentBranchId: null,
  curVersion: null,
};

export default SelectBranch;
