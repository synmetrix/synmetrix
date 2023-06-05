import React from 'react';

import RolesTable from './RolesTable';

const RolesManagement = () => {
  const roles = [
    {
      id: '9f351896-8121-4878-80f5-ea4a04a40c61',
      name: 'Team manager',
      created_at: '2023-04-13T13:21:46.282893+00:00',
      updated_at: '2023-05-26T14:30:07.335138+00:00',
      datasources: [
        {
          id: '6c6db01c-d195-4c47-ac52-385d9ec59939',
          name: 'Postgres Test',
          access_type: 'FULL ACCESS',
        },
      ],
    }
  ];

  return (
    <div>
      <b>Manage roles</b>
      <RolesTable roles={roles} />
    </div>
  );
};

export default RolesManagement;