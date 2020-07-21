import React from 'react';
import { EuiCodeEditor } from '@elastic/eui';
import { EuiSuperSelect } from '@elastic/eui';
import { Field } from 'src/plugins/data/public/index_patterns';


export function GanttChartEditor(props) {
  console.log('editor props', props)

  const createFieldSelect = (fieldName: string) => {
    const options = props.aggs.indexPattern.fields.map((field: Field) => {
      return {
        'value': field.name,
        'inputDisplay': field.name
      }
    })
    return (
      <>
        <EuiSuperSelect
          options={options}
          valueOfSelected={props.stateParams[fieldName]}
          onChange={(value) => props.setValue(fieldName, value)}
        />
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
      {createFieldSelect('labelField')}
      {createFieldSelect('startTimeField')}
      {createFieldSelect('durationField')}
      {codeEditor()}
    </>
  );
};
