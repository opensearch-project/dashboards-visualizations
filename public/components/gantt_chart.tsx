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
    if (source.length === 0)
      return data;

      // source is ordered by startTimeField, source[0] is the earliest trace and should start at 0
    let minStartTime: any = _.get(source[0], visParams.startTimeField);
    if (typeof minStartTime === 'string')
      minStartTime = Date.parse(minStartTime)

    source.reverse().forEach(document => {
      let rawStartTime: any = _.get(document, visParams.startTimeField);
      if (typeof rawStartTime === 'string')
        rawStartTime = Date.parse(rawStartTime)
      const startTime: any = rawStartTime - minStartTime;

      const duration: any = _.get(document, visParams.durationField);
      const label: any = _.get(document, visParams.labelField);
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
        visParams.durationField ? (
          <Plot
            data={getGanttData()}
            style={{ width: '100%', height: '100%' }}
            config={{ displayModeBar: false }}
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
                title: visParams.yAxisTitle,
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
