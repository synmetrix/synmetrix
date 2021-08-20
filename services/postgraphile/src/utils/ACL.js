const writerMethodsBlacklist = [
  'toggleUserStatus',
  'inviteTeamMember',
  'changeMemberRole',
  'checkRls',
  'checkRlsByModel',
  'cryptWithSalt',
  'updateTeam',
  'updateTeamByRowId',
  'allTeams',
  'removeTeamMember'
];

const writerScopesBlacklist = [
  'userManagement'
];

const viewerMethodsBlacklist = [
  ...writerMethodsBlacklist,
  'createCredentialsEntity',
  'createDataschema',
  'createDatasource',
  'deleteDataschema',
  'deleteDataschemaByRowId',
  'deleteDatasource',
  'deleteDatasourceByRowId',
  'updateDataschema',
  'updateDataschemaByRowId',
  'updateDatasource',
  'updateDatasourceByRowId',
  'dataschema',
  'dataschemaByRowId',
  'datasource',
  'team',
  'teamByRowId'
];

const viewerScopesBlacklist = [
  ...writerScopesBlacklist,
  'datasources',
  'dataschemas',
  'team'
];

const clientMethodsBlacklist = [
  ...viewerMethodsBlacklist,
  'allDatasources',
  'allDataschemas'
];

const clientScopesBlacklist = [
  ...viewerScopesBlacklist,
  'explore/workspace/cubes',
  'explore/header',
  'explore/workspace/querySettings',
  'explore/workspace/filters'
];

const ACL = [
  {
    key: 'client',
    restrictMethods: clientMethodsBlacklist,
    restrictScopes: clientScopesBlacklist
  },
  {
    key: 'viewer',
    restrictMethods: viewerMethodsBlacklist,
    restrictScopes: viewerScopesBlacklist
  },
  {
    key: 'writer',
    restrictMethods: writerMethodsBlacklist,
    restrictScopes: writerScopesBlacklist
  },
  {
    key: 'owner',
    restrictMethods: [],
    restrictScopes: []
  },
];

const getACLByRole = teamRole => ACL.find(item => item.key === teamRole) || {};

export { getACLByRole };
