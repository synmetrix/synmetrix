import React from 'react';
import PropTypes from 'prop-types';

import { getOr } from 'unchanged';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import pickKeys from 'utils/pickKeys';

const noop = () => {};
const MenuView = (props) => {
  const { nodes } = props;

  const getLink = (node) => {
    const linkProps = {
      to: node.path || '',
      onClick: (node.onClick && (() => node.onClick(node))) || noop,
    };

    return (
      <Link {...linkProps}>{node.title}</Link>
    );
  };

  const renderNode = (node) => {
    const children = getOr([], 'children', node);

    if (children.length) {
      return (
        <Menu.SubMenu key={node.key || node.title} title={node.title}>
          {children.map(renderNode)}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={node.key || node.title}>
        {getLink(node)}
      </Menu.Item>
    );
  };

  return (
    <Menu
      {...pickKeys(['className', 'style', 'mode', 'selectable', 'onClick', 'selectedKeys'], props)}
    >
      {nodes.map(renderNode)}
    </Menu>
  )
};

MenuView.propTypes = {
  nodes: PropTypes.array.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  mode: PropTypes.string,
}

MenuView.defaultProps = {
  className: null,
  style: {},
  mode: 'horizontal',
};

export default MenuView;
