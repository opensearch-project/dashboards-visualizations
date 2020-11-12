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
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { Field } from 'src/plugins/data/public/index_patterns';
import { GanttParams, GanttParamsFields, VisOptionsProps } from '../gantt_vis_type';

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
        <EuiFormRow label="Event" helpText="Gantt chart allows you to compare schedules of the selected field.">
          <EuiSuperSelect
            options={fieldOptions}
            valueOfSelected={stateParams.labelField || 'select'}
            onChange={(value) => setValue('labelField', value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Start time" helpText="Select a timestamp field to represent the beginning of a schedule.">
          <EuiSuperSelect
            options={fieldOptions}
            valueOfSelected={stateParams.startTimeField}
            onChange={(value) => setValue('startTimeField', value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Duration" helpText="Value of duration field must be a time interval that can be added to the start timestamp field.">
          <EuiSuperSelect
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
        <EuiFormRow label="View number of results" helpText="Results ordered by descending start time.">
          <EuiFieldNumber
            value={stateParams.size}
            onChange={(e) => setValue('size', parseInt(e.target.value, 10))}
          />
        </EuiFormRow>
      </EuiPanel>
    </>
  );
}
