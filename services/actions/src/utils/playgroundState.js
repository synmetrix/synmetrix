import fromPairs from "./fromPairs.js";

export const replaceQueryParams = (query, paramsValues) => {
  let index = -1;

  return query.replace(/(\$\d+)|\(\?[\w\d ]*\)/g, (match) => {
    index += 1;

    return match.replace(/\?|\$\d+/, `'${paramsValues[index]}'`);
  });
};

export const memberMap = (memberArray) =>
  fromPairs(memberArray.map((m) => [m.name, m]));

export const getCubeMembers = (memberName, memberType, cubesMap) => {
  const [cube] = memberName.split(".");

  if (!cubesMap[cube]) {
    return null;
  }

  return cubesMap[cube][memberType] || null;
};

export const resolveMember = (memberName, memberType, cubesMap) => {
  const [cube] = memberName.split(".");

  const memberTypes = Array.isArray(memberType) ? memberType : [memberType];

  const member = memberTypes
    .map(
      (type) =>
        getCubeMembers(cube, type, cubesMap) &&
        getCubeMembers(cube, type, cubesMap)[memberName]
    )
    .find((m) => m);

  if (!member) {
    return null;
  }

  return member;
};

export const DEFAULT_CATEGORIES = ["dimensions", "measures", "segments"];
export const updatePlaygroundState = (playgroundState, meta) => {
  const cubePairs = (meta || []).map((m) => [
    m.name,
    {
      measures: memberMap(m.measures),
      dimensions: memberMap(m.dimensions),
      segments: memberMap(m.segments),
    },
  ]);

  const cubesMap = fromPairs(cubePairs);

  const skippedMembers = [];

  const keys = [...DEFAULT_CATEGORIES, "filters"];
  const updatedPlaygroundState = Object.keys(playgroundState).reduce(
    (acc, curKey) => {
      if (keys.find((key) => key === curKey)) {
        const filteredArray = playgroundState[curKey].filter((m) => {
          if (curKey === "filters") {
            return resolveMember(
              m.dimension,
              ["dimensions", "measures"],
              cubesMap
            );
          }

          const resolved = resolveMember(m, curKey, cubesMap);

          if (resolved) {
            return true;
          }

          skippedMembers.push(m);
        });

        return {
          ...acc,
          [curKey]: filteredArray,
        };
      }

      return {
        ...acc,
        [curKey]: playgroundState[curKey],
      };
    },
    {}
  );

  return {
    updatedPlaygroundState,
    skippedMembers,
  };
};
