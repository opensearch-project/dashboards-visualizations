import React from 'react';
import { EuiCodeEditor } from '@elastic/eui';
import { EuiSuperSelect } from '@elastic/eui';
import { Field } from 'src/plugins/data/public/index_patterns';
import { EuiFlexGroup } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { EuiFlexGrid } from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';
import { EuiFieldNumber } from '@elastic/eui';


export function GanttChartEditor(props) {
  console.log('editor props', props)

  const fieldOptions = props.aggs.indexPattern.fields.map((field: Field) => {
    return {
      'value': field.name,
      'inputDisplay': field.name
    }
  });
  
  const createFieldSelect = (fieldName: string, displayName: string) => {
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
    )
  };

  const codeEditor = () => {
    return (
      <EuiCodeEditor
        mode="json"
        width="100%"
        value={props.stateParams.data}
        onChange={value => props.setValue('data', value)}
        showPrintMargin={false}
        setOptions={{
          fontSize: '12px',
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true
        }}
        aria-label="Code Editor"
      />
    )
  };

  return (
    <>
      <EuiText>Size</EuiText>
      <EuiFieldNumber
        value={props.stateParams.size}
        onChange={e => props.setValue('size', e.target.value)}
      />
      <EuiSpacer />
      {createFieldSelect('labelField', 'Label')}
      {createFieldSelect('startTimeField', 'Start time')}
      {createFieldSelect('durationField', 'Duration')}
      {/* {codeEditor()} */}
    </>
  );
};
