/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiColorPicker,
  EuiCompressedFieldText,
  EuiCompressedFormRow,
  EuiPanel,
  EuiCompressedSelect,
  EuiSpacer,
  EuiCompressedSwitch,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import {
  GanttParams,
  PlotlyAxisPosition,
  PlotlyAxisType,
  PlotlyLegendOrientation,
  VisOptionsProps,
} from '../gantt_vis_type';

export function OptionsEditor({ aggs, stateParams, setValue }: VisOptionsProps<GanttParams>) {
  const legendOrientationOptions: Array<{ value: PlotlyLegendOrientation; text: string }> = [
    { value: 'v', text: 'Vertical' },
    { value: 'h', text: 'Horizontal' },
  ];

  const renderLegendOptions = () => {
    return (
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>Legend</h3>
        </EuiTitle>
        <EuiSpacer size="s" />

        <EuiCompressedFormRow>
          <EuiCompressedSwitch
            data-test-subj="options-editor-legend-switch"
            label="Show legend"
            checked={stateParams.showLegend}
            onChange={(e) => setValue('showLegend', e.target.checked)}
          />
        </EuiCompressedFormRow>

        {stateParams.showLegend && (
          <EuiCompressedFormRow label="Orientation">
            <EuiCompressedSelect
              data-test-subj="options-editor-legend-orientation-select"
              options={legendOrientationOptions}
              value={stateParams.legendOrientation}
              onChange={(e) =>
                setValue('legendOrientation', e.target.value as PlotlyLegendOrientation)
              }
              disabled={!stateParams.showLegend}
            />
          </EuiCompressedFormRow>
        )}
      </EuiPanel>
    );
  };

  const renderGridOptions = () => {
    return (
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>Grid</h3>
        </EuiTitle>
        <EuiSpacer size="s" />

        <EuiCompressedFormRow>
          <EuiCompressedSwitch
            data-test-subj="options-editor-grid-y-switch"
            label="Show Y-axis grids"
            checked={stateParams.yAxisShowGrid}
            onChange={(e) => setValue('yAxisShowGrid', e.target.checked)}
          />
        </EuiCompressedFormRow>
        <EuiCompressedFormRow>
          <EuiCompressedSwitch
            data-test-subj="options-editor-grid-x-switch"
            label="Show X-axis grids"
            checked={stateParams.xAxisShowGrid}
            onChange={(e) => setValue('xAxisShowGrid', e.target.checked)}
          />
        </EuiCompressedFormRow>
      </EuiPanel>
    );
  };

  const renderColorOptions = () => {
    return (
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>Colors</h3>
        </EuiTitle>
        <EuiSpacer size="s" />

        <EuiCompressedFormRow label="Color">
          <EuiColorPicker color={stateParams.colors} onChange={(e) => setValue('colors', e)} />
        </EuiCompressedFormRow>
      </EuiPanel>
    );
  };

  const yAxisPositionOptions: Array<{ value: PlotlyAxisPosition; text: string }> = [
    { value: 'left', text: 'Left' },
    { value: 'right', text: 'Right' },
  ];

  const xAxisPositionOptions: Array<{ value: PlotlyAxisPosition; text: string }> = [
    { value: 'top', text: 'Top' },
    { value: 'bottom', text: 'Bottom' },
  ];

  const axisTypeOptions: Array<{ value: PlotlyAxisType; text: string }> = [
    { value: '-', text: 'Auto' },
    { value: 'linear', text: 'Linear' },
    { value: 'log', text: 'Log' },
  ];

  const timeFormatOptions: Array<{ value: string; text: string }> = [
    { value: 'hh:mm:ss.SSS A', text: 'hh:mm:ss.SSS (12 hours)' },
    { value: 'MM/DD hh:mm:ss A', text: 'MM/DD hh:mm:ss (12 hours)' },
    { value: 'MM/DD/YY hh:mm A', text: 'MM/DD/YY hh:mm (12 hours)' },
    { value: 'HH:mm:ss.SSS', text: 'hh:mm:ss.SSS (24 hours)' },
    { value: 'MM/DD HH:mm:ss', text: 'MM/DD hh:mm:ss (24 hours)' },
    { value: 'MM/DD/YY HH:mm', text: 'MM/DD/YY hh:mm (24 hours)' },
  ];

  const renderYAxisOptions = () => {
    return (
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>Y-axis</h3>
        </EuiTitle>
        <EuiSpacer size="s" />

        <EuiCompressedFormRow label="Position">
          <EuiCompressedSelect
            data-test-subj="options-editor-y-axis-position-select"
            options={yAxisPositionOptions}
            value={stateParams.yAxisPosition}
            onChange={(e) => setValue('yAxisPosition', e.target.value as PlotlyAxisPosition)}
          />
        </EuiCompressedFormRow>

        <EuiCompressedFormRow>
          <EuiCompressedSwitch
            data-test-subj="options-editor-y-axis-switch"
            label="Show Y-axis line"
            checked={stateParams.yAxisShowLine}
            onChange={(e) => setValue('yAxisShowLine', e.target.checked)}
          />
        </EuiCompressedFormRow>
        <EuiCompressedFormRow>
          <EuiCompressedSwitch
            data-test-subj="options-editor-y-axis-label-switch"
            label="Show Y-axis label"
            checked={stateParams.yAxisShowTitle}
            onChange={(e) => setValue('yAxisShowTitle', e.target.checked)}
          />
        </EuiCompressedFormRow>

        {stateParams.yAxisShowTitle ? (
          <EuiCompressedFormRow label="Label">
            <EuiCompressedFieldText
              data-test-subj="options-editor-y-axis-label-input"
              placeholder="Label"
              value={stateParams.yAxisTitle}
              onChange={(e) => setValue('yAxisTitle', e.target.value)}
            />
          </EuiCompressedFormRow>
        ) : null}
      </EuiPanel>
    );
  };

  const renderXAxisOptions = () => {
    return (
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>X-axis</h3>
        </EuiTitle>
        <EuiSpacer size="s" />

        <EuiCompressedFormRow label="Position">
          <EuiCompressedSelect
            data-test-subj="options-editor-x-axis-position-select"
            options={xAxisPositionOptions}
            value={stateParams.xAxisPosition}
            onChange={(e) => setValue('xAxisPosition', e.target.value as PlotlyAxisPosition)}
          />
        </EuiCompressedFormRow>
        <EuiCompressedFormRow label="Scale type">
          <EuiCompressedSelect
            data-test-subj="options-editor-x-axis-scale-type-select"
            options={axisTypeOptions}
            value={stateParams.xAxisType}
            onChange={(e) => setValue('xAxisType', e.target.value as PlotlyAxisType)}
          />
        </EuiCompressedFormRow>
        <EuiCompressedFormRow label="Time format">
          <EuiCompressedSelect
            data-test-subj="options-editor-x-axis-time-format-select"
            options={timeFormatOptions}
            value={stateParams.timeFormat}
            onChange={(e) => setValue('timeFormat', e.target.value)}
          />
        </EuiCompressedFormRow>

        <EuiCompressedFormRow>
          <EuiCompressedSwitch
            data-test-subj="options-editor-x-axis-switch"
            label="Show X-axis line"
            checked={stateParams.xAxisShowLine}
            onChange={(e) => setValue('xAxisShowLine', e.target.checked)}
          />
        </EuiCompressedFormRow>
        <EuiCompressedFormRow>
          <EuiCompressedSwitch
            data-test-subj="options-editor-x-axis-label-switch"
            label="Show X-axis label"
            checked={stateParams.xAxisShowTitle}
            onChange={(e) => setValue('xAxisShowTitle', e.target.checked)}
          />
        </EuiCompressedFormRow>

        {stateParams.xAxisShowTitle ? (
          <EuiCompressedFormRow label="Label">
            <EuiCompressedFieldText
              data-test-subj="options-editor-x-axis-label-input"
              placeholder="Label"
              value={stateParams.xAxisTitle}
              onChange={(e) => setValue('xAxisTitle', e.target.value)}
            />
          </EuiCompressedFormRow>
        ) : null}
      </EuiPanel>
    );
  };

  return (
    <>
      {renderYAxisOptions()}
      <EuiSpacer size="s" />
      {renderXAxisOptions()}
      <EuiSpacer size="s" />
      {renderLegendOptions()}
      <EuiSpacer size="s" />
      {renderGridOptions()}
      <EuiSpacer size="s" />
      {renderColorOptions()}
    </>
  );
}
