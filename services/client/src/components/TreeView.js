import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { get, getOr } from 'unchanged';

import { Tree, Icon } from 'antd';

import unflatten from 'utils/unflatten';

const { TreeNode, DirectoryTree } = Tree;

const components = {
  directory: DirectoryTree,
  tree: Tree,
};

const TreeView = (props) => {
  const { 
    parentComponent, 
    nodes,
    onSelect,
    onExpand,
    showLine,
    disableSelection,
    disableDefaultExpand,
    ...restProps
  } = props;

  const renderNode = (node) => {
    const children = getOr([], 'children', node);

    if (children.length || get('props.isDir', node)) {
      return (
        <TreeNode title={node.name} {...node.props} key={node.path}>
          {children.map(renderNode)}
        </TreeNode>
      );
    }

    return (
      <TreeNode
        title={node.name}
        {...node.props}
        key={node.path}
        isLeaf
      />
    );
  };

  const TreeNodes = useMemo(
    () => (nodes || []).map(node => {
      if (node.parentPath) {
        return null;
      }

      // start unflatting only first Level dirs
      return unflatten(nodes, node);
    }),
    [nodes]
  );

  const ParentComponent = components[parentComponent];

  const parentProps = {
    [disableSelection && 'selectedKeys']: [],
    showLine,
  };

  const parentKeys = nodes.filter(n => !n.parentPath).map(n => n.path);

  return (
    <ParentComponent
      multiple 
      defaultExpandedKeys={disableDefaultExpand ? [] : parentKeys}
      onSelect={onSelect} 
      onExpand={onExpand}
      {...parentProps}
      {...restProps}
    >
      {TreeNodes.filter(t => !!t).map(n => renderNode(n))}
    </ParentComponent>
  );
};

TreeView.propTypes = {
  parentComponent: PropTypes.string,
  nodes: PropTypes.array,
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  showLine: PropTypes.bool,
  disableSelection: PropTypes.bool,
  disableDefaultExpand: PropTypes.bool,
}

TreeView.defaultProps = {
  parentComponent: 'directory',
  nodes: [],
  onSelect: () => {},
  onExpand: () => {},
  showLine: false,
  disableSelection: false,
  disableDefaultExpand: false,
};

export default TreeView;
