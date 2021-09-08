import { useMemo } from 'react';
import { getTitle } from './usePlayground';

const useAnalyticsQueryMembers = ({ selectedQueryMembers, settings = {} }) => {
  const baseMembers = useMemo(
    () => {
      const { measures = [], dimensions = [] } = selectedQueryMembers || {};
      const members = dimensions.concat(measures);

      // selectedQueryMembers contains arrays in sections, but we use Object.values just because safer
      const measuresValues = Object.values(measures).map(obj => ({
        [getTitle(settings, obj)]: obj.name,
      }));

      const dimensionsValues = Object.values(dimensions).map(obj => ({
        [getTitle(settings, obj)]: obj.name,
      }));

      const allMembers = measuresValues.concat(dimensionsValues);

      const index = members.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: curr,
      }), {});

      return {
        index,
        allMembers,
        measures: measuresValues,
        dimensions: dimensionsValues,
      };
    },
    [selectedQueryMembers, settings]
  );

  return {
    baseMembers,
  };
};

export default useAnalyticsQueryMembers;
