import unchanged from 'unchanged';

const { get } = unchanged;

export const parseNodeId = (build, nodeId) => {
  try {
    return build.getTypeAndIdentifiersFromNodeId(nodeId);
  } catch(e) {
    console.error(`"${nodeId}" looks not like ID`);

    return {
      identifiers: [nodeId],
    }
  }
}

export const currentUserTopicFromContext = (args, context) => {
  const userId = get('jwtClaims.user_id', context);
  const { channelKey = 'unnamed' } = args;

  if (userId) {
    return `${channelKey}/${userId}`;
  } else {
    throw new Error("You're not logged in");
  }
};
