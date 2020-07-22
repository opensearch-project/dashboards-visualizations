import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';
import { UiSettingsClient } from 'src/core/public/ui_settings';
import { ExprVis } from 'src/plugins/visualizations/public';
import { GanttSuccessResponse, GanttParams } from '../gantt_vis_type';
import { PlotData } from 'plotly.js';

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
  const getGanttData = (): PlotData[] => {
    const source: any[] = visData.source;
    const data: PlotData[] = [];
    
    source.forEach(document => {
      const startTime = document[visParams.startTimeField];
      const duration = document[visParams.durationField];
      const label = document[visParams.labelField];
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
        } as PlotData,
        {
          x: [duration],
          y: [label],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          name: label,
        } as PlotData
      );
    });
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
