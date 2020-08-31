import { Vis, PersistedState } from 'src/plugins/visualizations/public';
import { IAggConfigs } from 'src/plugins/data/public';
import { GanttChart } from './components/gantt_chart';
import { GanttChartEditor } from './components/gantt_chart_editor';
import { GanttVisDependencies } from './plugin';
import { AxesEditor } from './components/axes_editor';
import { PanelEditor } from './components/panel_editor';
import { getGanttRequestHandler } from './gantt_request_handler';

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
  durationField: string;
};

export type PlotlyAxisPosition = 'top' | 'left' | 'right' | 'bottom';
export type PlotlyAxisType = '-' | 'linear' | 'log' | 'date' | 'category';
export type PlotlyLegendOrientation = 'v' | 'h';

export interface GanttParamsOptions {
  size: number;

  yAxisPosition: PlotlyAxisPosition;
  yAxisShow: boolean;
  yAxisShowLabels: boolean;
  yAxisTitle: string;

  xAxisPosition: PlotlyAxisPosition;
  xAxisType: PlotlyAxisType;
  xAxisShow: boolean;
  xAxisShowLabels: boolean;
  xAxisTitle: string;

  legendOrientation: PlotlyLegendOrientation;
  showLegend: boolean;
  yAxisShowGrid: boolean;
  xAxisShowGrid: boolean;
  useDefaultColors: boolean;
  colors: string;
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

    size: 10,

    yAxisPosition: 'left',
    yAxisShow: true,
    yAxisShowLabels: true,
    yAxisTitle: '',
    xAxisPosition: 'bottom',

    xAxisType: 'linear',
    xAxisShow: true,
    xAxisShowLabels: true,
    xAxisTitle: '',

    legendOrientation: 'v',
    showLegend: true,
    xAxisShowGrid: true,
    yAxisShowGrid: false,
    useDefaultColors: false,
    colors: '#6092C0',
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
        { name: 'axes_editor', title: 'Axes', editor: AxesEditor },
        { name: 'panel_editor', title: 'Panel Settings', editor: PanelEditor },
      ]
    },
    requestHandler: ganttRequestHandler,
    responseHandler: ganttResponseHandler,
  };
}
