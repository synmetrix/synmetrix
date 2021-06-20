import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { get, getOr } from 'unchanged';

import { useQuery } from 'urql';

import { extendConfigByFieldValues } from 'utils/form';

const nodesQuery = `
  query NodesQuery {
    allNodes {
      nodes {
        name
        resources
        reservedResources
        attributes
      }
    }
  }
`;

export default ({ pauseQueryAll }) => {
  const { t } = useTranslation();
  const [allData, executeQueryAll] = useQuery({
    query: nodesQuery,
    pause: true,
  });

  const allNodes = useMemo(() => getOr([], 'data.allNodes.nodes', allData), [allData]);

  useEffect(() => {
    if (!pauseQueryAll) {
      executeQueryAll({ requestPolicy: 'network-only' });
    }
  }, [pauseQueryAll, executeQueryAll]);

  const values = allNodes.map(node => {
    const { CPU: totalCPU = 0, MemoryMB: totalRAM = 0 } = getOr({}, 'resources', node);
    const { CPU: reservedCPU = 0, MemoryMB: reservedRAM = 0 } = getOr({}, 'reservedResources', node);

    const freeCPU = totalCPU - reservedCPU;
    const freeRAM = totalRAM - reservedRAM;

    const nodeType = get('attributes.server', node) === 'true' ? '(master)' : '';
    const consulName = getOr(node.name, 'attributes.consulName', node);

    const title = (
      <>
        <div>
          <b>{consulName} {nodeType}</b>
        </div>
        <div>
          {`CPU: ${freeCPU}/${totalCPU} MHz`}
        </div>
        <div>
          {`RAM: ${freeRAM}/${totalRAM} MB`}
        </div>
      </>
    );

    return {
      [consulName]: title,
    };
  });

  values.unshift({ auto: 'auto' });

  const formConfig = {
    'constraints.node_name': {
      required: true,
      section: t('Constraints'),
      label: 'Node',
      display: 'select',
      default: 'auto',
      values,
      optionLabelProp: 'label',
      span: 24,
      onDropdownVisibleChange: open => open && executeQueryAll({ pauseQueryAll: true, requestPolicy: 'network-only' })
    },
  };

  return {
    allNodes,
    queries: {
      allData, executeQueryAll
    },
    formConfig
  };
};
