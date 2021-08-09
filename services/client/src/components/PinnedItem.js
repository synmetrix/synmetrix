import React, { useRef, Children, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { get } from 'unchanged';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useSize } from 'ahooks';

import { Icon, Popconfirm, message } from 'antd';
import Loader from 'components/Loader';
import Chart from 'components/Chart';
import EditableField from 'components/EditableField';

import usePinnedItems from 'hooks/usePinnedItems';

import s from './PinnedItem.module.css';

const PinnedItem = ({ rowId, updateDashboard }) => {
  const ref = useRef();
  const size = useSize(ref);

  const { t } = useTranslation();
  const [renaming, setRenaming] = useState(false);

  const {
    current,
    queries: {
      currentData: {
        fetching: loadingPinnedItem
      }
    },
    mutations: {
      deleteMutation, mExecuteDeleteMutation,
      updateMutation, mExecUpdateMutation
    }
  } = usePinnedItems({ rowId });

  const onConfirmDelete = () => {
    mExecuteDeleteMutation(rowId);
  };

  const onRename = (id, value) => {
    if (value.name !== current.name) {
      setRenaming(true);
      mExecUpdateMutation(id, value);
    }
  };

  useEffect(() => {
    if (deleteMutation.error) {
      message.error(deleteMutation.error.message);
    } else if (deleteMutation.data && updateDashboard) {
      updateDashboard();
      deleteMutation.data = null;
    }
  }, [deleteMutation.data, deleteMutation.error, updateDashboard]);

  useEffect(() => {
    if (updateMutation.error) {
      message.error(updateMutation.error.message);
    } else if (updateMutation.data) {
      setRenaming(false);
      updateMutation.data = null;
    }
  }, [updateMutation.data, updateMutation.error]);

  const slug = get('explorationByExplorationId.slug', current);
  const datasourceId = get('explorationByExplorationId.datasourceId', current);

  const type = get('spec.type', current);
  let link = `/d/explore/${datasourceId}/${slug}`;
  if (type === 'chart') {
    link = `${link}?chart=${current.rowId}`;
  }

  return (
    <div className={s.pinnedItem} ref={ref}>
      <div className={s.header}>
        {current.id && (
          <Loader spinning={renaming}>
            <EditableField
              currentValue={current.name}
              renameFunc={onRename}
              id={current.id}
              style={{ minWidth: 0 }}
            />
          </Loader>
        )}
        <div>
          {datasourceId && slug && (
            <>
              <Link href={`/d/charts/${rowId}`}>
                <a style={{ marginRight: 10 }}>
                  <Icon type="export" />
                </a>
              </Link>
              <Link href={link}>
                <a style={{ marginRight: 10 }}>
                  <Icon type="eye" />
                </a>
              </Link>
            </>
          )}
          <Popconfirm
            title={t('Are you sure delete this chart?')}
            onConfirm={onConfirmDelete}
            okText={t('Yes')}
            okType="danger"
            cancelText={t('No')}
          >
            <Icon className={s.closeButton} type="close" />
          </Popconfirm>
        </div>
      </div>
      <Chart current={current} loading={loadingPinnedItem} size={size} />
    </div>
  );
};

PinnedItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  updateDashboard: PropTypes.func,
};

PinnedItem.defaultProps = {
  updateDashboard: () => {},
};

export default PinnedItem;
