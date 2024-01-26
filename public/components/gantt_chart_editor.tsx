/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiFieldNumber,
  EuiFormRow,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { Field } from 'src/plugins/dashboard/public/types';
import { GanttParams, VisOptionsProps } from '../gantt_vis_type';

export function GanttChartEditor({ aggs, stateParams, setValue }: VisOptionsProps<GanttParams>) {
  const fieldOptions = aggs.indexPattern.fields.map((field: Field) => {
    return {
      value: field.name,
      inputDisplay: field.name,
    };
  });

  return (
    <>
      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>Metrics</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiFormRow
          label="Event"
          helpText="Gantt chart allows you to compare schedules of the selected field."
        >
          <EuiSuperSelect
            data-test-subj="gantt-chart-editor-label-field"
            options={fieldOptions}
            valueOfSelected={stateParams.labelField || 'select'}
            onChange={(value) => setValue('labelField', value)}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Start time"
          helpText="Select a timestamp field to represent the beginning of a schedule."
        >
          <EuiSuperSelect
            data-test-subj="gantt-chart-editor-start-time-field"
            options={fieldOptions}
            valueOfSelected={stateParams.startTimeField}
            onChange={(value) => setValue('startTimeField', value)}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Duration"
          helpText="Value of duration field must be a time interval that can be added to the start timestamp field."
        >
          <EuiSuperSelect
            data-test-subj="gantt-chart-editor-duration-field"
            options={fieldOptions}
            valueOfSelected={stateParams.durationField}
            onChange={(value) => setValue('durationField', value)}
          />
        </EuiFormRow>
      </EuiPanel>

      <EuiSpacer size="s" />

      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>Results</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiFormRow
          label="View number of results"
          helpText="Results ordered by descending start time."
        >
          <EuiFieldNumber
            data-test-subj="gantt-chart-editor-size-field"
            value={stateParams.size}
            onChange={(e) => setValue('size', parseInt(e.target.value, 10))}
          />
        </EuiFormRow>
      </EuiPanel>
    </>
  );
}
