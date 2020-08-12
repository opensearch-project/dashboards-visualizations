import { VisParams, Vis, PersistedState } from 'src/plugins/visualizations/public';
import { IndexPattern, IAggConfigs } from 'src/plugins/data/public';
import { GanttChart } from './components/gantt_chart';
import { GanttChartEditor } from './components/gantt_chart_editor';
import { GanttVisDependencies } from './plugin';
import { buildEsQuery, TimeRange, Filter, Query } from '../../../src/plugins/data/common';
import { getTimezone } from '../../../src/plugins/vis_type_timeseries/public/application/lib/get_timezone';
import { calculateBounds } from '../../../src/plugins/data/public/query/timefilter/get_time';
import { AxesEditor } from './components/axes_editor';

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

export interface GanttParamsFields {
  labelField: string;
  startTimeField: string;
  endTimeField: string;
};

export interface GanttParamsOptions {
  size: number;
  useDuration: boolean;
}

export type GanttParams = GanttParamsFields & GanttParamsOptions;

export interface VisOptionsProps<VisParamType = unknown> {
  aggs: IAggConfigs;
  hasHistogramAgg: boolean;
  isTabSelected: boolean;
  stateParams: VisParamType;
  vis: Vis;
  uiState: PersistedState;
  setValue<T extends keyof VisParamType>(paramName: T, value: VisParamType[T]): void;
  setValidity(isValid: boolean): void;
  setTouched(isTouched: boolean): void;
}


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
    endTimeField: '',
    size: 10,
    useDuration: false,
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
      optionTabs: [
        { name: 'gantt_chart_editor', title: 'Data', editor: GanttChartEditor },
        { name: 'b', title: 'Axes', editor: AxesEditor },
      ]
    },
    requestHandler: ganttRequestHandler,
    responseHandler: ganttResponseHandler,
  };
}
