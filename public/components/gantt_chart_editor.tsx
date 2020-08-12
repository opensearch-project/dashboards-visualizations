import { EuiFieldNumber, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiSuperSelect, EuiSwitch, EuiText } from '@elastic/eui';
import React from 'react';
import { Field } from 'src/plugins/data/public/index_patterns';
import { GanttParams, GanttParamsFields, VisOptionsProps } from '../gantt_vis_type';

export function GanttChartEditor({
  aggs,
  stateParams,
  setValue,
}: VisOptionsProps<GanttParams>) {
  const fieldOptions = aggs.indexPattern.fields.map((field: Field) => {
    return {
      value: field.name,
      inputDisplay: field.name,
    };
  });

  const createFieldSelect = (fieldName: keyof GanttParamsFields, displayName: string) => {
    return (
      <>
        <EuiFlexGroup alignItems='center' gutterSize='none'>
          <EuiFlexItem grow={false} style={{ width: 80 }}>
            <EuiText>{displayName}</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSuperSelect
              options={fieldOptions}
              valueOfSelected={stateParams[fieldName]}
              onChange={(value) => setValue(fieldName, value)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
      </>
    );
  };

  return (
    <>
      <EuiFlexGroup alignItems='center' gutterSize='none'>
        <EuiFlexItem grow={false} style={{ width: 80 }}>
          <EuiText>Size</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFieldNumber
            value={stateParams.size}
            onChange={(e) => setValue('size', parseInt(e.target.value, 10))}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      {createFieldSelect('labelField', 'Label')}
      {createFieldSelect('startTimeField', 'Start time')}
      {createFieldSelect('endTimeField', stateParams.useDuration ? 'Duration' : 'End time')}
      <EuiSwitch
        label='Use "Duration" instead of "End time"'
        checked={stateParams.useDuration}
        onChange={(e) => setValue('useDuration', e.target.checked)}
      />
    </>
  );
}
