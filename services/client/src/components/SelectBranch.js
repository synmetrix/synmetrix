import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useThrottleEffect } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { Icon, Select, Input, Divider, Button, Tag, message } from 'antd';

import MoreMenu from './MoreMenu';

const { Option } = Select;

const SelectBranch = ({ onChange, onCreate, onSetDefault, branchStatus, currentBranchId, currentVersion, moreMenu, branches, loading }) => {
  const { t } = useTranslation();

  const { checksum, id } = currentVersion;

  const isDefaultBranch = useMemo(() => branchStatus === 'active', [branchStatus]);

  const [state, updateState] = useState({
    selectOpen: false,
    newBranchName: t('New branch'),
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

  useThrottleEffect(() => {
    if (!loading && branches.length && !branches.find(b => b.status === 'active')) {
      onSetDefault(branches?.[0]?.id);
    }
  },
  [branches, loading, onSetDefault], {
    wait: 1000,
  });

  useEffect(() => {
    if ((!currentBranchId && branches.length) || (branches.length && !branches.find(b => b.id === currentBranchId))) {
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

  const value = useMemo(() => branches.find(b => b.id === currentBranchId) ? currentBranchId : '', [branches, currentBranchId]);

  return (
    <div style={{ padding: '10px', maxWidth: '100%' }}>
      <div style={{ paddingBottom: '10px' }}>
        {t('Branch')}:
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
          onKeyPress={() => updateState(prev => ({ ...prev, selectOpen: !state.selectOpen }))}
          role='button'
          tabIndex={0}
        >
          <Select
            style={{ width: '100%', cursor: 'pointer' }}
            placeholder={t('Select branch')}
            open={state.selectOpen}
            loading={loading}
            onSelect={onSelect}
            value={value}
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
      {checksum && (
        <div style={{ paddingTop: '12px' }}>
          {t('Version')}:
          <Tag
            style={{ margin: '6px 0', cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(checksum);
              message.success('Copied to clipboard');
            }}
          >
            {checksum}
          </Tag>
          <Button size="small" onClick={() => { window.open(`/~/docs/${id}`, '_blank').focus() }}>
            {t('Open docs')}
          </Button>
        </div>
      )}
      {!isDefaultBranch && (
        <div style={{ margin: '10px 0' }}>
          <Button onClick={() => onSetDefault()}>{t('Set as default')}</Button>
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
  currentVersion: PropTypes.string,
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
  currentVersion: null,
};

export default SelectBranch;
