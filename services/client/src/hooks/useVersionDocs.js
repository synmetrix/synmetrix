import { useSubscription } from 'urql';

const versionDocSubscription = `
  subscription VersionDocQuery($id: uuid!) {
    versions_by_pk(id: $id) {
      markdown_doc
    }
  }
`;

export default ({ versionId }) => {
  const [docData, execDocQuery] = useSubscription({
    query: versionDocSubscription,
    variables: {
      id: versionId
    }
  }, (_, response) => response);

  return [docData, execDocQuery];
};
