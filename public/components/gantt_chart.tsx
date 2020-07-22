import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';


export function GanttChart(props) {
  console.log('gantt chart props', props)
  const getGanttData = () => {
    const source = props.visData.source;
    console.log('plotly source', source)
    const data = [];
    for (let i = 0; i < source.length; i++) {
      const x_start = source[i][props.visParams.startTimeField];
      const x_duration = source[i][props.visParams.durationField];
      const y = source[i][props.visParams.labelField];
      data.push(
        {
          x: [x_start],
          y: [y],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          marker: { color: 'rgba(255,255,255,0)' },
          hoverinfo: 'none',
          showlegend: false,
        },
        {
          x: [x_duration],
          y: [y],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          name: y
        }
      )
    }
    console.log('plotly data:', data)
    return data;
  };

  return (
    <Fragment>
      {props.visParams.labelField && props.visParams.startTimeField && props.visParams.durationField ? (
        <Plot
          data={getGanttData()}
          style={{ width: "100%", height: "100%" }}
          layout={{
            autosize: true,
            barmode: 'stack',
            margin: {
              l: 80,
              r: 10,
              b: 30,
              t: 10,
              pad: 4
            },
            showlegend: true,
            legend: {
              orientation: 'h',
              traceorder: 'normal',
            },
            yaxis: {
              type: 'category'
            }
          }}
        />
      ) : (null)}
    </Fragment>
  );
};
