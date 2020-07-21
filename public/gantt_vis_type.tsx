import { Schemas } from '../../../src/plugins/vis_default_editor/public';
import { GanttChartEditor } from './components/gantt_chart_editor';
import { GanttChart } from './components/gantt_chart';
import { GanttVisDependencies } from './plugin';
import { buildEsQuery } from '../../../src/plugins/data/common';

const ganttRequestHandler = async (vis) => {
  const DSL = buildEsQuery(vis.index, vis.query, vis.filters);
  const request = {
    index: vis.index.title,
    DSL: DSL,
  };
  console.log('request vis: ', vis)
  console.log('request POST: ', request)
  return fetch('../api/gantt_vis/query', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'kbn-xsrf': 'query',
    },
    body: JSON.stringify(request),
  })
    .then(resp => {
      // console.log('resp', resp)
      return resp.json()
    })
    .then(json => {
      // console.log('json', json)
      // JSON.parse(json.resp)
      return json.hits;
    })
};

const ganttResponseHandler = async (vis) => {
  // console.log('response handler')
  // console.log('vis', vis)
  const x_start = [], x_duration = [], y = [];
  vis.forEach((resp, i) => {
    const { bytes, response } = resp._source;
    x_start.push(bytes)
    x_duration.push(response)
    y.push(i)
  });
  return {
    x_start,
    x_duration,
    y
  };
};

export function getGanttVisDefinition(dependencies: GanttVisDependencies) {
  return {
    name: 'gantt_vis',
    title: 'Gantt Chart',
    icon: 'visBarHorizontalStacked',
    description:
      'This visualization allows you to create a Gantt chart.',
    visConfig: {
      component: GanttChart,
      defaults: {
        data: `{
  "x_start":[1, 2, 5, 6, 11],
  "x_duration": [3, 4, 7, 8, 7],
  "y":[5, 4, 3, 2, 1]
}`,
      },
    },
    editorConfig: {
      optionsTemplate: GanttChartEditor,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          aggFilter: ['!derivative', '!geo_centroid'],
          defaults: [{ type: 'count', schema: 'metric' }]
        }, {
          group: 'buckets',
          name: 'segment',
          title: 'Bucket Split',
          min: 0,
          max: 1,
          aggFilter: ['!geohash_grid', '!filter']
        }
      ]),
    },
    requestHandler: ganttRequestHandler,
    responseHandler: ganttResponseHandler,
  }
}