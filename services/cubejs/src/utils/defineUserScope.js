import buildSecurityContext from "./buildSecurityContext.js";

const defineUserScope = (
  allDataSources,
  allMembers,
  selectedDataSourceId,
  selectedBranchId
) => {
  const dataSource = allDataSources.find(
    (source) => source.id === selectedDataSourceId
  );

  if (!dataSource) {
    throw new Error(`404: source "${selectedDataSourceId}" not found`);
  }

  let selectedBranch;

  if (selectedBranchId) {
    const branch = dataSource.branches.find(
      (branch) => branch.id === selectedBranchId
    );

    if (!branch) {
      throw new Error(`404: branch "${selectedBranchId}" not found`);
    }

    selectedBranch = branch;
  } else {
    const defaultBranch = dataSource.branches.find(
      (branch) => branch.status === "active"
    );

    if (!defaultBranch) {
      throw new Error(`400: default branch not found`);
    }

    selectedBranch = defaultBranch;
  }

  const dataSourceMemberRole = allMembers.find(
    (member) => (member.team_id = dataSource.team_id)
  )?.member_roles?.[0];

  if (!dataSourceMemberRole) {
    throw new Error(`403: member role not found`);
  }

  const { access_list: accessList } = dataSourceMemberRole;
  const dataSourceAccessList =
    accessList?.datasources?.[selectedDataSourceId]?.cubes;

  const dataSourceContext = buildSecurityContext(dataSource, selectedBranch);

  return {
    dataSource: dataSourceContext,
    dataSourceAccessList,
    role: dataSourceMemberRole.team_role,
  };
};

export default defineUserScope;
