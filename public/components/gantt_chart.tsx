import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';


export function GanttChart(props) {
  console.log('props', props)
  const getGanttData = () => {
    const rawData = JSON.parse(props.visParams.data);
    const data = [];
    for (let i = 0; i < rawData.y.length; i++) {
      const x_start = rawData.x_start[i];
      const x_duration = rawData.x_duration[i];
      const y = rawData.y[i];
      data.push(
        {
          x: [x_start],
          y: [y],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          marker: { color: 'rgba(255,255,255,0)' },
          hoverinfo: "none",
          showlegend: false,
        },
        {
          x: [x_duration],
          y: [y],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
        }
      )
    }
    return data;
  };
  
  return (
    <Fragment>
      <Plot
        data={getGanttData()}
        style={{ width: "100%", height: "100%" }}
        layout={{
          autosize: true,
          barmode: 'stack',
          margin: {
            l: 40,
            r: 10,
            b: 40,
            t: 10,
            pad: 4
          },
          showlegend: true,
          legend: {
            orientation: 'h',
            traceorder: 'normal',
          },
        }}
      />
    </Fragment>
  );
};
