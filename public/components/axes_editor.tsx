import { EuiFieldNumber, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiSuperSelect, EuiSwitch, EuiText } from '@elastic/eui';
import React from 'react';
import { Field } from 'src/plugins/data/public/index_patterns';
import { GanttParams, GanttParamsFields, VisOptionsProps } from '../gantt_vis_type';
import { EuiPanel } from '@elastic/eui';

export function AxesEditor({
  aggs,
  stateParams,
  setValue,
}: VisOptionsProps<GanttParams>) {

  return (
    <>
      <EuiPanel paddingSize="s">
      </EuiPanel>
    </>
  );
}
