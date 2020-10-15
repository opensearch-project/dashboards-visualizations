/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {
  EuiColorPicker,
  EuiFieldText,
  EuiFormRow,
  EuiPanel,
  EuiSelect,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { GanttParams, PlotlyAxisPosition, PlotlyAxisType, PlotlyLegendOrientation, VisOptionsProps } from '../gantt_vis_type';

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

        <EuiFormRow>
          <EuiSwitch
            label="Show legend"
            checked={stateParams.showLegend}
            onChange={(e) => setValue('showLegend', e.target.checked)}
          />
        </EuiFormRow>

        {stateParams.showLegend &&
          <EuiFormRow label="Orientation">
            <EuiSelect
              options={legendOrientationOptions}
              value={stateParams.legendOrientation}
              onChange={(e) =>
                setValue('legendOrientation', e.target.value as PlotlyLegendOrientation)
              }
              disabled={!stateParams.showLegend}
            />
          </EuiFormRow>
        }
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

        <EuiFormRow>
          <EuiSwitch
            label="Show Y-axis grids"
            checked={stateParams.yAxisShowGrid}
            onChange={(e) => setValue('yAxisShowGrid', e.target.checked)}
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiSwitch
            label="Show X-axis grids"
            checked={stateParams.xAxisShowGrid}
            onChange={(e) => setValue('xAxisShowGrid', e.target.checked)}
          />
        </EuiFormRow>
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

        <EuiFormRow label="Color">
          <EuiColorPicker
            color={stateParams.colors}
            onChange={(e) => setValue('colors', e)}
          />
        </EuiFormRow>
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

        <EuiFormRow label="Position">
          <EuiSelect
            options={yAxisPositionOptions}
            value={stateParams.yAxisPosition}
            onChange={(e) => setValue('yAxisPosition', e.target.value as PlotlyAxisPosition)}
          />
        </EuiFormRow>

        <EuiFormRow>
          <EuiSwitch
            label="Show Y-axis line"
            checked={stateParams.yAxisShowLine}
            onChange={(e) => setValue('yAxisShowLine', e.target.checked)}
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiSwitch
            label="Show Y-axis label"
            checked={stateParams.yAxisShowTitle}
            onChange={(e) => setValue('yAxisShowTitle', e.target.checked)}
          />
        </EuiFormRow>

        {stateParams.yAxisShowTitle ? (
          <EuiFormRow label="Label">
            <EuiFieldText
              placeholder="Label"
              value={stateParams.yAxisTitle}
              onChange={(e) => setValue('yAxisTitle', e.target.value)}
            />
          </EuiFormRow>
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

        <EuiFormRow label="Position">
          <EuiSelect
            options={xAxisPositionOptions}
            value={stateParams.xAxisPosition}
            onChange={(e) => setValue('xAxisPosition', e.target.value as PlotlyAxisPosition)}
          />
        </EuiFormRow>
        <EuiFormRow label="Scale type">
          <EuiSelect
            options={axisTypeOptions}
            value={stateParams.xAxisType}
            onChange={(e) => setValue('xAxisType', e.target.value as PlotlyAxisType)}
          />
        </EuiFormRow>
        <EuiFormRow label="Time format">
          <EuiSelect
            options={timeFormatOptions}
            value={stateParams.timeFormat}
            onChange={(e) => setValue('timeFormat', e.target.value)}
          />
        </EuiFormRow>

        <EuiFormRow>
          <EuiSwitch
            label="Show X-axis line"
            checked={stateParams.xAxisShowLine}
            onChange={(e) => setValue('xAxisShowLine', e.target.checked)}
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiSwitch
            label="Show X-axis label"
            checked={stateParams.xAxisShowTitle}
            onChange={(e) => setValue('xAxisShowTitle', e.target.checked)}
          />
        </EuiFormRow>

        {stateParams.xAxisShowTitle ? (
          <EuiFormRow label="Label">
            <EuiFieldText
              placeholder="Label"
              value={stateParams.xAxisTitle}
              onChange={(e) => setValue('xAxisTitle', e.target.value)}
            />
          </EuiFormRow>
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
