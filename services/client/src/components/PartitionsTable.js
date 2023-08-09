import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Row, Col, Input } from 'antd';

import PrismCode from 'components/PrismCode';
import TableList from 'components/TableList';
import formatDistanceToNow from '../utils/formatDistanceToNow';

const { TextArea } = Input;

const PartitionsTable = ({ partitions }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('Name'),
      dataIndex: 'preAggregationId',
      key: 'preAggregationId',
    },
    {
      title: t('Last started'),
      dataIndex: 'last_time',
      key: 'last_time',
      render: (_, record) => {
        const lastTime = record?.versionEntries?.[0]?.last_updated_at;
        
        if (lastTime) {
          return formatDistanceToNow(lastTime);
        }

        return '-';
      },
    },
  ];

  return [
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={false}
          rowKey={row => row.id}
          columns={columns}
          dataSource={partitions}
          expandRowByClick
          expandedRowRender={(partition) => {
            const sql = partition?.sql?.[0];
            const vars = partition?.sql?.[1];

            return (
              <div>
                <div>
                  <b>{t('SQL')}:</b>
                  <PrismCode lang="sql" code={sql || ''} />
                  {vars?.length > 0 && (
                    <TextArea
                      disabled
                      rows={5}
                      value={vars.map((v, i) => `$${i + 1} = "${v}"`).join('\n')}
                      style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: 'white' }}
                    />
                  )}
                </div>
              </div>
            );
          }}
        />
      </Col>
    </Row>,
  ];
};

PartitionsTable.propTypes = {
  partitions: PropTypes.array,
  loading: PropTypes.bool,
  onClickRow: PropTypes.func,
};

PartitionsTable.defaultProps = {
  partitions: [],
  loading: false,
  onClickRow: () => {},
};

export default PartitionsTable;
