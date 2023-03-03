import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Button, Icon, Select, Input, Divider } from 'antd';

import { useSetState, useLocalStorageState } from 'ahooks';

import useCurrentUserState from 'hooks/useCurrentUserState';

const { Option } = Select;

const SelectWithInput = ({ title, placeholder, onChange, onCreate, loading }) => {
  const { currentUserState: currentUser } = useCurrentUserState();

  const [state, updateState,] = useLocalStorageState('currentBranch' ,{
    defaultValue: {
      selectOpen: false,
      selectedBranch: null,
      newBranchName: 'New branch',
    },
  });

  const onSelect = useCallback((value) => {
    updateState(prev => ({ ...prev, selectedBranch: value, selectOpen: false }));
  }, [updateState]);

  const onChangeInput = (e) => {
    updateState({ newBranchName: e.target.value });
  };

  const onCreateBranch = () => {
    onCreate(state.newBranchName);
  };

  useEffect(() => {
    if (state.selectedBranch) {
      onChange(state.selectedBranch);
    }
  }, [state.selectedBranch, onChange]);

  useEffect(() => {
    if (!state.selectedBranch && currentUser.branches) {
      updateState(prev => ({ ...prev, selectedBranch: currentUser.branches?.[0]?.id }));
    }
  }, [state.selectedBranch, currentUser.branches, updateState]);

  return (
    <>
      <div>
        {title && title}
      </div>
      <div onClick={() => updateState(prev => ({ ...prev, selectOpen: !state.selectOpen }))}>
        <Select
          style={{ width: 240, cursor: 'pointer' }}
          placeholder={placeholder}
          open={state.selectOpen}
          loading={loading}
          onSelect={onSelect}
          defaultValue={state.selectedBranch}
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
                  // disabled={createPinnedItemMutation.fetching}
                  maxLength={20}
                  addonAfter={(
                    <Icon
                      onClick={onCreateBranch}
                      type={false ? 'loading' : 'plus'}
                    />
                  )}
                />
              </div>
            </div>
          )}
        >
          {currentUser.branches?.map((item) => <Option key={item.id}>{item.name}</Option>)}
        </Select>
      </div>
    </>
  );
};


SelectWithInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  defaultName: PropTypes.string,
  onChange: PropTypes.func,
  onCreate: PropTypes.func,
  loading: PropTypes.bool,
};

SelectWithInput.defaultProps = {
  title: null,
  placeholder: null,
  defaultName: '',
  onChange: () => {},
  onCreate: () => {},
  loading: false,
};

export default SelectWithInput;
