import { EuiFieldText, EuiFormRow, EuiHorizontalRule, EuiPanel, EuiSelect, EuiSpacer, EuiSwitch, EuiTitle } from '@elastic/eui';
import React from 'react';
import { GanttParams, PlotlyAxisPosition, PlotlyAxisType, VisOptionsProps } from '../gantt_vis_type';

export function AxesEditor({
  aggs,
  stateParams,
  setValue,
}: VisOptionsProps<GanttParams>) {

  const yAxisPositions: { value: PlotlyAxisPosition; text: string }[] = [
    { value: 'left', text: 'Left' },
    { value: 'right', text: 'Right' },
  ];

  const xAxisPositions: { value: PlotlyAxisPosition; text: string }[] = [
    { value: 'top', text: 'Top' },
    { value: 'bottom', text: 'Bottom' },
  ];

  const axisType: { value: PlotlyAxisType; text: string }[] = [
    { value: '-', text: 'Auto' },
    { value: 'linear', text: 'Linear' },
    { value: 'log', text: 'Log' },
    { value: 'date', text: 'Date' },
    { value: 'category', text: 'Category' },
  ];

  const renderYAxisOptions = () => {
    return (
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs"><h3>Y-axis</h3></EuiTitle>
        <EuiSpacer size="s" />

        <EuiFormRow label="Position">
          <EuiSelect
            options={yAxisPositions}
            value={stateParams.yAxisPosition}
            onChange={(e) => setValue('yAxisPosition', e.target.value as PlotlyAxisPosition)}
          />
        </EuiFormRow>
        <EuiHorizontalRule margin='m' />

        <EuiFormRow>
          <EuiSwitch
            label="Show axis lines and labels"
            checked={stateParams.yAxisShow}
            onChange={(e) => setValue('yAxisShow', e.target.checked)}
          />
        </EuiFormRow>

        {stateParams.yAxisShow ? (
          <>
            <EuiFormRow label="Title">
              <EuiFieldText
                placeholder='Title'
                value={stateParams.yAxisTitle}
                onChange={(e) => setValue('yAxisTitle', e.target.value)}
              />
            </EuiFormRow>

            <EuiFormRow label="Labels">
              <EuiSwitch
                label="Show labels"
                checked={stateParams.yAxisShowLabels}
                onChange={(e) => setValue('yAxisShowLabels', e.target.checked)}
              />
            </EuiFormRow>
          </>
        ) : null}
      </EuiPanel>
    )
  };

  const renderXAxisOptions = () => {
    return (
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs"><h3>X-axis</h3></EuiTitle>
        <EuiSpacer size="s" />

        <EuiFormRow label="Position">
          <EuiSelect
            options={xAxisPositions}
            value={stateParams.xAxisPosition}
            onChange={(e) => setValue('xAxisPosition', e.target.value as PlotlyAxisPosition)}
          />
        </EuiFormRow>
        <EuiFormRow label="Scale type">
          <EuiSelect
            options={axisType}
            value={stateParams.xAxisType}
            onChange={(e) => setValue('xAxisType', e.target.value as PlotlyAxisType)}
          />
        </EuiFormRow>
        <EuiHorizontalRule margin='m' />

        <EuiFormRow>
          <EuiSwitch
            label="Show axis lines and labels"
            checked={stateParams.xAxisShow}
            onChange={(e) => setValue('xAxisShow', e.target.checked)}
          />
        </EuiFormRow>

        {stateParams.xAxisShow ? (
          <>
            <EuiFormRow label="Title">
              <EuiFieldText
                placeholder='Title'
                value={stateParams.xAxisTitle}
                onChange={(e) => setValue('xAxisTitle', e.target.value)}
              />
            </EuiFormRow>

            <EuiFormRow label="Labels">
              <EuiSwitch
                label="Show labels"
                checked={stateParams.xAxisShowLabels}
                onChange={(e) => setValue('xAxisShowLabels', e.target.checked)}
              />
            </EuiFormRow>
          </>
        ) : null}
      </EuiPanel>
    )
  }

  return (
    <>
      {renderYAxisOptions()}
      <EuiSpacer size='s' />
      {renderXAxisOptions()}
    </>
  );
}
