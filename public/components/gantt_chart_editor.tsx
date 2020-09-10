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
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
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

  const createFieldSelect = (fieldName: keyof GanttParamsFields, displayName: string) => {
    return (
      <>
        <EuiFlexGroup alignItems="center" gutterSize="none">
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
      <EuiFlexGroup alignItems="center" gutterSize="none">
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
      {createFieldSelect('durationField', 'Duration')}
    </>
  );
}
