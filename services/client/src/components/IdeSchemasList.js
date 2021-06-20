import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Icon, Input } from 'antd';

import { useTranslation } from 'react-i18next';

import useSubstringSearch from 'hooks/useSubstringSearch';

import PopoverButton from 'components/PopoverButton';
import TextWithAction from 'components/TextWithAction';
import Highlight from 'components/Highlight';
import DataSchemaForm from 'components/DataSchemaForm';
import MenuView from 'components/MenuView';

const IdeSchemasList = ({ schemas, onItemClick, onCreate, onEdit, onDelete, moreMenu }) => {
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);

  const formRef = useRef(null);
  const { t } = useTranslation();

  const { 
    term: searchTerm,
    matchedItems: filteredSchemas,
    setTerm,
  } = useSubstringSearch(schemas, 'code');

  const popconfirmProps = {
    title: t('Are you sure delete this data schema?'),
    okText: t('Yes'),
    cancelText: t('No'),
  };

  const onSearch = e => {
    const { value } = e.target;

    if (value && value.length > 2) {
      setTerm(value);
    } else {
      setTerm('');
    }
  };

  const onSubmit = (editId) => {
    const { form } = formRef.current;

    form.validateFields((err, values) => {
      if (err) {
        console.log("Error: ", values);
        return;
      }

      console.log("Received values of form: ", values);

      if (!editId) {
        form.resetFields();
        onCreate(values);
      } else {
        onEdit(editId, values);
      }
    });
  };

  const mapSchema = schema => schema && [
    <TextWithAction 
      key={schema.id}
      item={schema} 
      onClick={() => onItemClick(schema)}
      actionContent={[
        <PopoverButton
          key="edit"
          iconType="edit"
          content={(
            <DataSchemaForm
              editId={schema.id}
              onSubmit={onSubmit}
              wrappedComponentRef={formRef}
              initialValues={{
                name: schema.name,
              }}
            />
          )}
          trigger="click"
          style={{ marginRight: 2 }}
        />,
        <PopoverButton
          key="delete"
          type="popconfirm"
          iconType="delete"
          trigger="click"
          onConfirm={(e) => {
            e.stopPropagation();
            e.preventDefault();

            onDelete(schema.id);
          }}
          {...popconfirmProps}
        />,
      ]}
    />,
    Object.entries(schema.matchedLines || {}).map(([lineIndex, match]) => (
      <Highlight 
        key={lineIndex}
        index={Number(lineIndex)}
        text={match.line}
        indices={match.indices}
        onClick={() => onItemClick(schema, lineIndex)}
      />
    )),
  ];

  const allSchemas = (searchTerm && filteredSchemas || schemas);

  return [
    <div 
      key="header"
      style={{
        display: 'flex',
        height: '60px',
        alignItems: 'center',
        padding: '0 10px',
      }}
    >
      <div style={{ flex: 1 }}>
        <Input 
          prefix={<Icon type="search" />} 
          placeholder="Find..."
          size="small"
          onChange={onSearch}
          allowClear
        />
      </div>
      <PopoverButton
        iconType="plus"
        content={(
          <DataSchemaForm 
            onSubmit={onSubmit} 
            wrappedComponentRef={formRef}
          />
        )}
        trigger="click"
        style={{ marginLeft: 5, marginRight: 2 }}
      />
      <PopoverButton
        type="dropdown"
        iconType="more"
        visible={moreMenuVisible}
        onVisibleChange={(vis) => setMoreMenuVisible(vis)}
        overlay={(
          <MenuView 
            mode={null}
            nodes={moreMenu}
            selectable={false}
            onClick={() => setMoreMenuVisible(false)}
          />
        )}
        trigger={['click']}
      />
    </div>,
    !schemas.length && <div key="no_schemas" style={{ padding: 10 }}>No schemas yet...</div>,
    allSchemas.map(mapSchema),
  ];
};

IdeSchemasList.propTypes = {
  schemas: PropTypes.array,
  onItemClick: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  moreMenu: PropTypes.arrayOf(PropTypes.object),
};

IdeSchemasList.defaultProps = {
  schemas: [],
  onItemClick: () => {},
  onCreate: () => {},
  onEdit: () => {},
  onDelete: () => {},
  moreMenuContent: null,
};

export default IdeSchemasList;
