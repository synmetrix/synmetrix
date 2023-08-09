import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import cx from 'classnames';

import s from './TableList.module.css';
import EmptyDefault from './EmptyDefault';

const TableList = ({ noEmptyImage, ...restProps }) => (
  <Table
    size="small"
    className={cx({
      [s.small]: true,
      [s.noImage]: noEmptyImage,
    })}
    locale={{
      emptyText: <EmptyDefault />,
      
    }}
    rowClassName={s.row}
    {...restProps}
  />
);

TableList.propTypes = {
  noEmptyImage: PropTypes.bool, 
};

TableList.defaultProps = {
  noEmptyImage: false, 
};

export default TableList;
