/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { UiSettingsClient } from '../../../../src/core/public/ui_settings';
import { ExprVis } from '../../../../src/plugins/visualizations/public';
import { GanttParams, GanttSuccessResponse, VisOptionsProps } from '../../public/gantt_vis_type';

export const MockStateParams = {
  colors: '#6092C0',
  durationField: 'duration',
  labelField: 'spanID',
  legendOrientation: 'v',
  showLegend: true,
  size: 10,
  startTimeField: 'startTime',
  timeFormat: 'hh:mm:ss.SSS A',
  xAxisPosition: 'bottom',
  xAxisShow: true,
  xAxisShowGrid: true,
  xAxisShowLine: true,
  xAxisShowTitle: true,
  xAxisTitle: '',
  xAxisType: 'linear',
  yAxisPosition: 'left',
  yAxisShow: true,
  yAxisShowGrid: false,
  yAxisShowLine: true,
  yAxisShowTitle: true,
  yAxisTitle: '',
} as VisOptionsProps<GanttParams>['stateParams'];

const MockAggs = {
  indexPattern: {
    fields: [
      { name: 'test-field-1' },
      { name: 'test-field-2' },
      { name: 'test-field-3' },
      { name: 'test-field-4' },
      { name: 'test-field-5' },
      { name: 'test-field-6' },
      { name: 'test-field-7' },
    ],
  },
} as VisOptionsProps<GanttParams>['aggs'];

export const mockEditorProps = (setValue: any) => ({
  ...(({
    setValue,
    stateParams: MockStateParams,
    aggs: MockAggs,
  } as unknown) as VisOptionsProps<GanttParams>),
});

export const mockGanttProps = () => ({
  visData: {
    total: 25,
    source: [
      {
        spanID: '57f46877f868af92',
        startTime: 1590695963803408,
        duration: 51929,
      },
      {
        spanID: '68daf6ca76398de9',
        startTime: 1590695963786548,
        duration: 45766,
      },
      {
        spanID: '439a27333a6e8893',
        startTime: 1590695963786541,
        duration: 45777,
      },
    ],
  },
  visParams: MockStateParams,
} as unknown) as {
  config: UiSettingsClient;
  vis: ExprVis;
  visData: GanttSuccessResponse;
  visParams: GanttParams;
};
