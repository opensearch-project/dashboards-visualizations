import React from 'react';
import { EuiSuperSelect } from '@elastic/eui';
import { Field } from 'src/plugins/data/public/index_patterns';
import { EuiText } from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';
import { EuiFieldNumber } from '@elastic/eui';
import { AggConfigs } from 'src/plugins/data/public/search';
import { Vis, PersistedState } from 'src/plugins/visualizations/public';
import { GanttParams } from '../gantt_vis_type';

export function GanttChartEditor(props: {
  aggs: AggConfigs;
  vis: Vis;
  uiState: PersistedState;
  stateParams: GanttParams;
  setValue<T extends keyof GanttParams>(paramName: T, value: GanttParams[T]): void;
  setValidity(isValid: boolean): void;
  setTouched(isTouched: boolean): void;
}) {
  const fieldOptions = props.aggs.indexPattern.fields.map((field: Field) => {
    return {
      value: field.name,
      inputDisplay: field.name,
    };
  });

  const createFieldSelect = (fieldName: keyof GanttParams, displayName: string) => {
    return (
      <>
        <EuiText>{displayName}</EuiText>
        <EuiSuperSelect
          options={fieldOptions}
          valueOfSelected={props.stateParams[fieldName]}
          onChange={(value) => props.setValue(fieldName, value)}
        />
        <EuiSpacer />
      </>
    );
  };

  return (
    <>
      <EuiText>Size</EuiText>
      <EuiFieldNumber
        value={props.stateParams.size}
        onChange={(e) => props.setValue('size', e.target.value)}
      />
      <EuiSpacer />
      {createFieldSelect('labelField', 'Label')}
      {createFieldSelect('startTimeField', 'Start time')}
      {createFieldSelect('durationField', 'Duration')}
    </>
  );
}
