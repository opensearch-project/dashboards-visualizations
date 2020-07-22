import { VisParams } from 'src/plugins/visualizations/public';
import { IndexPattern } from 'src/plugins/data/public';
import { GanttChart } from './components/gantt_chart';
import { GanttChartEditor } from './components/gantt_chart_editor';
import { GanttVisDependencies } from './plugin';
import { buildEsQuery, TimeRange, Filter, Query } from '../../../src/plugins/data/common';
import { getTimezone } from '../../../src/plugins/vis_type_timeseries/public/application/lib/get_timezone';
import { calculateBounds } from '../../../src/plugins/data/public/query/timefilter/get_time';

export interface SearchResponse {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: any;
  _version?: number;
  fields?: any;
  highlight?: any;
  inner_hits?: any;
  matched_queries?: string[];
  sort?: string[];
};

export interface GanttParams {
  labelField: string;
  startTimeField: string;
  durationField: string;
  size: string;
};

export interface GanttSuccessResponse {
  source: any[];
  total: number;
};

const getGanttRequestHandler = ({
  uiSettings,
  http
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
    const timeZone = getTimezone(uiSettings);
    const parsedTimeRange = calculateBounds(timeRange);

    const DSL = buildEsQuery(index, query, filters);
    DSL.bool.must.push({
      range: {
        timestamp: {
          gte: parsedTimeRange.min,
          lte: parsedTimeRange.max,
          time_zone: timeZone,
        },
      },
    });
    const request = {
      index: index.title,
      size: visParams.size,
      query: DSL,
    };
    console.log('request POST: ', request);
    return await http.post('../api/gantt_vis/query', {
      body: JSON.stringify(request),
    });
  };
};

const getGanttResponseHandler = () => async ({
  total,
  hits,
}: {
  total: number;
  hits: SearchResponse[];
}) => {
  const responseData: GanttSuccessResponse = {
    total,
    source: hits.map((hit) => hit._source),
  };
  return responseData;
};

export function getGanttVisDefinition(dependencies: GanttVisDependencies) {
  const ganttRequestHandler = getGanttRequestHandler(dependencies);
  const ganttResponseHandler = getGanttResponseHandler();
  const ganttParams: GanttParams = {
    labelField: '',
    startTimeField: '',
    durationField: '',
    size: '10',
  };

  return {
    name: 'gantt_vis',
    title: 'Gantt Chart',
    icon: 'visBarHorizontalStacked',
    description: 'This visualization allows you to create a Gantt chart.',
    visConfig: {
      component: GanttChart,
      defaults: ganttParams,
    },
    editorConfig: {
      optionsTemplate: GanttChartEditor,
    },
    requestHandler: ganttRequestHandler,
    responseHandler: ganttResponseHandler,
  };
}
