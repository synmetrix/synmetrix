import { useState } from 'react';

export default () => {
  const [state, setState] = useState({
    brokenPoint: false,
    siderCollapsed: true,
  })

  const onBreakpoint = (brokenPoint) => {
    setState(prev => ({ ...prev, brokenPoint, siderCollapsed: !brokenPoint }));
  }

  const onCollapse = (collapsed, type) => {
    if (type === 'clickTrigger') {
      setState(prev => ({ ...prev, siderCollapsed: collapsed }));
    }
  };

  return {
    state,
    onBreakpoint,
    onCollapse,
  };
}
