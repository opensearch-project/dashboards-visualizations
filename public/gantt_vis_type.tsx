import { GanttChartEditor } from './components/gantt_chart_editor';
import { GanttChart } from './components/gantt_chart';
import { GanttVisDependencies } from './plugin';
import { buildEsQuery, TimeRange, Filter, Query } from '../../../src/plugins/data/common';
import { VisParams } from 'src/plugins/visualizations/public';
import { IndexPattern } from 'src/plugins/data/public';
import { getTimezone } from '../../../src/plugins/vis_type_timeseries/public/application/lib/get_timezone';

const getGanttRequestHandler = ({
  uiSettings,
  http,
}: GanttVisDependencies) => {
  return async ({
    timeRange,
    filters,
    query,
    index,
    visParams,
  }: {
    timeRange: TimeRange;
    filters: Filter[];
    query: Query;
    index: IndexPattern;
    visParams: VisParams;
    forceFetch?: boolean;
  }) => {
    const timezone = getTimezone(uiSettings);
    
    const DSL = buildEsQuery(index, query, filters);
    const request = {
      index: index.title,
      DSL: DSL,
    };
    console.log('request POST: ', request)
    return await http.post('../api/gantt_vis/query', {
      body: JSON.stringify(request),
    })
  };
};

const getGanttResponseHandler = () => async ({
  total,
  hits
}: {
  total: number,
  hits: Object[];
}) => {
  const x_start = [], x_duration = [], y = [];
  hits.forEach((resp, i) => {
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
  const ganttRequestHandler = getGanttRequestHandler(dependencies);
  const ganttResponseHandler = getGanttResponseHandler();
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
    },
    requestHandler: ganttRequestHandler,
    responseHandler: ganttResponseHandler,
  }
}