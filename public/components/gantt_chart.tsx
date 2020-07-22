import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';
import { UiSettingsClient } from 'src/core/public/ui_settings';
import { ExprVis } from 'src/plugins/visualizations/public';
import { GanttSuccessResponse, GanttParams } from '../gantt_vis_type';

export function GanttChart({
  config,
  vis,
  visData,
  visParams,
}: {
  config: UiSettingsClient;
  vis: ExprVis;
  visData: GanttSuccessResponse;
  visParams: GanttParams;
}) {
  const getGanttData = () => {
    const source = visData.source;
    console.log('plotly source', source);
    const data = [];
    for (let i = 0; i < source.length; i++) {
      const startTime = source[i][visParams.startTimeField];
      const duration = source[i][visParams.durationField];
      const label = source[i][visParams.labelField];
      data.push(
        {
          x: [startTime],
          y: [label],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          marker: { color: 'rgba(255,255,255,0)' },
          hoverinfo: 'none',
          showlegend: false,
        },
        {
          x: [duration],
          y: [label],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          name: label,
        }
      );
    }
    console.log('plotly data:', data);
    return data;
  };

  return (
    <Fragment>
      {visParams.labelField &&
        visParams.startTimeField &&
        visParams.durationField ? (
          <Plot
            data={getGanttData()}
            style={{ width: '100%', height: '100%' }}
            layout={{
              autosize: true,
              barmode: 'stack',
              margin: {
                l: 80,
                r: 10,
                b: 30,
                t: 10,
                pad: 4,
              },
              showlegend: true,
              legend: {
                orientation: 'h',
                traceorder: 'normal',
              },
              yaxis: {
                type: 'category',
              },
            }}
          />
        ) : null}
    </Fragment>
  );
}
