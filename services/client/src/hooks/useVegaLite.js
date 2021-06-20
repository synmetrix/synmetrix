import { useState, useEffect } from 'react';
import { get, getOr } from 'unchanged';
import * as vl from 'vega-lite-api';

const vegaMarkToChart = {
  line: 'markLine',
  bar: 'markBar',
  area: 'markArea',
  // pie
  // https://github.com/vega/vega-lite/issues/408#issuecomment-373870307
};

// https://vega.github.io/vega-lite/docs/field.html
// If field names contain dots or brackets but are not nested, use \\ to escape dots and brackets
const escapeDots = field => field && field.replace('.', '\\.');

const buildVegaSpec = (playgroundState, enrichedMembers, data) => {
  const vlMarkF = vegaMarkToChart[playgroundState.chartType];

  if (!vlMarkF) {
    return {};
  }

  // 1 graph by default
  const graphsCount = getOr([], 'dimensions', enrichedMembers).length || 1;

  const timeDimension = get(['timeDimensions', 0], enrichedMembers);
  const timeDimensionName = get(['dimension', 'name'], timeDimension);

  console.log(timeDimensionName);

  const createLayer = (measure, serie) => {
    let mark = vl[vlMarkF]();
    let measureName = measure.name;

    if (serie) {
      // need this because of bar/area charts that doens't work with the default name
      // don't know why
      const newMeasureName = measureName.replace('.', '_');

      mark = mark.transform(
        vl
          .groupby(escapeDots(serie.name), escapeDots(timeDimensionName))
          .aggregate(vl.sum(escapeDots(measure.name)).as(newMeasureName))
      );

      measureName = newMeasureName;
    }

    const vlY = (type = 'quantitative') => measure && vl.y({ field: escapeDots(measureName), type });
    const vlX = (type = 'temporal') => timeDimensionName && vl.x({ field: escapeDots(timeDimensionName), type });
    const vlColor = (type = 'nominal') => serie && vl.color({ field: escapeDots(serie.name), type });

    const y = vlY();
    let x = vlX();
    let color = vlColor();

    if (!timeDimensionName) {
      x = vlColor();
      color = null;
    }

    mark = mark
      .encode(...[x, y, color].filter(m => !!m))
      .width(600)
      .height(300);

    return mark;
  };

  const vlConcat = [];
  for (let i = 0; i < graphsCount; i += 1) {
    const serie = get(['dimensions', i], enrichedMembers);

    const layers = getOr([], 'measures', enrichedMembers).map(m => {
      return createLayer(m, serie);
    });

    vlConcat.push(vl.layer(layers));
  }

  const spec = vl.data(data).hconcat(vlConcat);

  // https://vega.github.io/vega-lite/docs/resolve.html
  return {
    ...spec.toSpec(),
    resolve: {
      scale: {
        color: 'independent',
      },
    },
  };
};

export default (playgroundState, enrichedMembers, data) => {
  const [vegaSpec, setState] = useState();

  useEffect(() => {
    setState(buildVegaSpec(playgroundState, enrichedMembers, data));
    // eslint-disable-next-line
  }, [data]);

  return vegaSpec;
};
