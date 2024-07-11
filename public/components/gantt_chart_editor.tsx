/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiCompressedFieldNumber,
  EuiCompressedFormRow,
  EuiPanel,
  EuiSpacer,
  EuiCompressedSuperSelect,
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
        <EuiCompressedFormRow
          label="Event"
          helpText="Gantt chart allows you to compare schedules of the selected field."
        >
          <EuiCompressedSuperSelect
            data-test-subj="gantt-chart-editor-label-field"
            options={fieldOptions}
            valueOfSelected={stateParams.labelField || 'select'}
            onChange={(value) => setValue('labelField', value)}
          />
        </EuiCompressedFormRow>
        <EuiCompressedFormRow
          label="Start time"
          helpText="Select a timestamp field to represent the beginning of a schedule."
        >
          <EuiCompressedSuperSelect
            data-test-subj="gantt-chart-editor-start-time-field"
            options={fieldOptions}
            valueOfSelected={stateParams.startTimeField}
            onChange={(value) => setValue('startTimeField', value)}
          />
        </EuiCompressedFormRow>
        <EuiCompressedFormRow
          label="Duration"
          helpText="Value of duration field must be a time interval that can be added to the start timestamp field."
        >
          <EuiCompressedSuperSelect
            data-test-subj="gantt-chart-editor-duration-field"
            options={fieldOptions}
            valueOfSelected={stateParams.durationField}
            onChange={(value) => setValue('durationField', value)}
          />
        </EuiCompressedFormRow>
      </EuiPanel>

      <EuiSpacer size="s" />

      <EuiPanel paddingSize="s">
        <EuiTitle size="xs">
          <h3>Results</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiCompressedFormRow
          label="View number of results"
          helpText="Results ordered by descending start time."
        >
          <EuiCompressedFieldNumber
            data-test-subj="gantt-chart-editor-size-field"
            value={stateParams.size}
            onChange={(e) => setValue('size', parseInt(e.target.value, 10))}
          />
        </EuiCompressedFormRow>
      </EuiPanel>
    </>
  );
}
