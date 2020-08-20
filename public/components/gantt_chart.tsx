import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';
import { UiSettingsClient } from 'src/core/public/ui_settings';
import { ExprVis } from 'src/plugins/visualizations/public';
import { GanttSuccessResponse, GanttParams } from '../gantt_vis_type';
import { PlotData } from 'plotly.js';
import _ from 'lodash';

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
      const startTime: any = _.get(document, visParams.startTimeField);
      const endTime: any = _.get(document, visParams.endTimeField);
      const label: any = _.get(document, visParams.labelField);
      const duration = visParams.useDuration ? endTime : Date.parse(endTime) - Date.parse(startTime);
      // console.log(label, startTime, endTime, duration)
      const rest = visParams.useDefaultColors ? {} : { marker: { color: visParams.colors } };
      data.push(
        {
          x: [startTime],
          y: [label],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          marker: { color: 'rgba(0, 0, 0, 0)' },
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
          text: [duration],
          hovertemplate: '%{text:.2f}',
          ...rest,
        } as PlotData
      );
    });
    return data;
  };

  return (
    <Fragment>
      {visParams.labelField &&
        visParams.startTimeField &&
        visParams.endTimeField ? (
          <Plot
            data={getGanttData()}
            style={{ width: '100%', height: '100%' }}
            layout={{
              autosize: true,
              barmode: 'stack',
              // margin: {
              //   l: 80,
              //   r: 10,
              //   b: 30,
              //   t: 10,
              //   pad: 4,
              // },
              margin: {
                t: 30,
              },
              showlegend: visParams.showLegend,
              legend: {
                orientation: visParams.legendOrientation,
                traceorder: 'normal',
              },
              xaxis: {
                side: visParams.xAxisPosition,
                title: visParams.xAxisTitle,
                type: visParams.xAxisType,
                visible: visParams.xAxisShow,
                showticklabels: visParams.xAxisShowLabels,
                showgrid: visParams.xAxisShowGrid,
              },
              yaxis: {
                side: visParams.yAxisPosition,
                title: visParams.xAxisTitle,
                type: 'category',
                visible: visParams.yAxisShow,
                showticklabels: visParams.yAxisShowLabels,
                showgrid: visParams.yAxisShowGrid,
              },
            }}
          />
        ) : null}
    </Fragment>
  );
}
