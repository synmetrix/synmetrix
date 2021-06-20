import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Icon, Popover, Button, Popconfirm, Dropdown } from 'antd';

import pickKeys from 'utils/pickKeys';

const popconfirmProps = [
  'cancelText',
  'okText',
  'okType',
  'title',
  'onCancel',
  'onConfirm',
  'icon',
  'disabled',
  'trigger',
];

const dropdownProps = [
  'getPopupContainer',
  'overlay',
  'overlayClassName',
  'overlayStyle',
  'placement',
  'disabled',
  'trigger',
];

const PopoverButton = ({
  type,
  iconType,
  shape,
  actionText,
  onClick,
  visible,
  defaultVisible,
  onVisibleChange,
  disabled,
  ...restProps
}) => {
  const [visibleState, setVisible] = useState(defaultVisible);

  useEffect(
    () => {
      if (visible !== null && visible !== visibleState) {
        setVisible(visible);
      }
    },
    [visible, visibleState]
  );

  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onVisChange = (vis) => {
    if (!disabled) {
      setVisible(vis);
      onVisibleChange(vis);
    }
  };

  const actionButton = (
    <Button
      size="small"
      shape={shape}
      disabled={disabled}
      onClick={e => {
        stopPropagation(e);
        onClick(e);
      }}
      {...pickKeys(['style', 'className'], restProps)}
    >
      {iconType && <Icon type={iconType} />}
      {actionText || null}
    </Button>
  );

  if (type === 'popconfirm') {
    return (
      <Popconfirm
        visible={visibleState}
        onVisibleChange={onVisChange}
        {...pickKeys(popconfirmProps, restProps)}
      >
        {actionButton}
      </Popconfirm>
    );
  }

  if (type === 'dropdown') {
    return (
      <Dropdown
        visible={visibleState}
        onVisibleChange={onVisChange}
        {...pickKeys(dropdownProps, restProps)}
      >
        {actionButton}
      </Dropdown>
    );
  }

  return (
    <div onClick={stopPropagation}>
      <Popover
        visible={visibleState}
        onVisibleChange={onVisChange}
        onFocus={stopPropagation}
        onMouseLeave={stopPropagation}
        onMouseEnter={stopPropagation}
        onClick={stopPropagation}
        disabled={disabled}
        {...restProps}
      >
        {actionButton}
      </Popover>
    </div>
  );
};

PopoverButton.propTypes = {
  type: PropTypes.string,
  shape: PropTypes.string,
  iconType: PropTypes.string,
  actionText: PropTypes.string,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

PopoverButton.defaultProps = {
  type: 'primary',
  shape: 'circle',
  iconType: 'plus',
  actionText: null,
  visible: null,
  defaultVisible: false,
  onVisibleChange: () => { },
  onClick: () => { },
  disabled: false
};

export default PopoverButton;
