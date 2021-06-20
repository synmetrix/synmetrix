import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Menu } from 'antd';

import PopoverButton from 'components/PopoverButton';

import s from './ContentHeader.module.css';

const ContentHeader = ({ rowId, title, entities, onChange, extra }) => {
  const onClick = ({ key }) => {
    onChange(key);
  };

  const overlay = entities.length > 1 && (
    <Menu onClick={onClick}>
      {entities.map(d => d.rowId !== rowId && <Menu.Item key={d.rowId}>{d.name}</Menu.Item>)}
    </Menu>
  );

  let colsConfig = {
    left: {
      xs: 22,
      sm: 20,
      md: 12,
      lg: 12,
    },
    right: {
      xs: 2,
      sm: 4,
      md: 12,
      lg: 12,
    },
  };

  if (!extra) {
    colsConfig = {
      left: {
        xs: 24,
      },
    };
  }

  const content = typeof(title) === 'string' ? <h4 style={{ margin: 0 }}>{title}</h4> : title;

  return (
    <Row type="flex" align="middle" justify="space-between" className={s.root}>
      <Col {...colsConfig.left}>
        <div className={s.container}>
          {content}
          <div style={{ marginLeft: 15 }}>
            {overlay && (
              <PopoverButton
                iconType="down"
                type="dropdown"
                overlay={overlay}
                trigger={['hover']}
              />
            )}
          </div>
        </div>
      </Col>
      {extra && (
        <Col {...colsConfig.right}>
          <div className={s.container} style={{ paddingLeft: 0 }}>
            {extra}
          </div>
        </Col>
      )}
    </Row>
  );
};

ContentHeader.propTypes = {
  rowId: PropTypes.number,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  entities: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  extra: PropTypes.element
};

ContentHeader.defaultProps = {
  entities: [],
  title: '',
  rowId: null,
  extra: null
};

export default ContentHeader;
