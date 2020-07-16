import React from 'react';
import { EuiCodeEditor } from '@elastic/eui';


export function GanttChartEditor(props) {
  console.log('editor props', props)
  const onCounterChange = (ev: any) => {
    props.setValue('data', ev);
  };

  return (
    <EuiCodeEditor
      mode="json"
      width="100%"
      value={props.stateParams.data}
      onChange={ev => onCounterChange(ev)}
      showPrintMargin={false}
      setOptions={{
        fontSize: '12px',
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      }}
      aria-label="Code Editor"
    />
  );
};
