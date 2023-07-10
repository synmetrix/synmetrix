import { useEffect, useMemo, useState } from 'react';

import useQuery from './useQuery';

const role = 'user';
export default ({ editId }) => {
  const [allRoles, setAllRoles] = useState([
    {
      id: '9f351896-8121-4878-80f5-ea4a04a40c61',
      name: 'Team manager',
      created_at: '2023-04-13T13:21:46.282893+00:00',
      updated_at: '2023-05-26T14:30:07.335138+00:00',
      datasources: {
        '9f227fc2-3207-45cc-a819-1f9df526f3a4': {
          models: {
            Tasks: {
              measures: ['Count'],
              dimensions: ['Task'],
            },
          },
        },
      },
    },
    {
      id: '6d351896-5742-4878-80f5-ea4a04a40c71',
      name: 'Custom manager',
      created_at: '2023-04-13T13:21:46.282893+00:00',
      updated_at: '2023-05-26T14:30:07.335138+00:00',
      // datasources: [
      //   {
      //     id: '6c6db01c-d195-4c47-ac52-385d9ec59939',
      //     access_type: 'PARTIAL ACCESS',
      //     cubes: [],
      //   },
      // ],
    }
  ]);

  const saveRole = (newRole) => {
    const rolesObj = allRoles.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
    rolesObj[newRole.id] = newRole;

    const newRoles = Object.values(allRoles);
    setAllRoles(newRoles);
  };

  const current = useMemo(() => allRoles.find(r => r.id === editId), [allRoles, editId]);

  return {
    allRoles,
    current,
    saveRole,
  };
};
