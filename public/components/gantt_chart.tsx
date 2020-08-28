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
      
    const getStartTime = typeof _.get(source[0], visParams.startTimeField) === 'string' ?
      (document: any): number => Date.parse(_.get(document, visParams.startTimeField)) :
      (document: any): number => _.get(document, visParams.startTimeField);

    // source is ordered by startTimeField desc, last trace is the earliest trace and should start at 0
    const minStartTime: number = getStartTime(source[source.length - 1])

    source.forEach(document => {
      const rawStartTime: number = getStartTime(document);
      const startTime: number = rawStartTime - minStartTime;

      const duration: any = _.get(document, visParams.durationField);
      const label: any = _.get(document, visParams.labelField);
      const rest = visParams.useDefaultColors ? {} : {
        marker: { color: visParams.colors }
      };
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
          hovertemplate: '%{text}<extra></extra>',
          ...rest,
        } as PlotData
      );
    });
    return data;
  };
  
  const ganttData = getGanttData();

  return (
    <Fragment>
      {visParams.labelField &&
        visParams.startTimeField &&
        visParams.durationField ? (
            <Plot
              data={ganttData}
              style={{ width: '100%', height: '100%' }}
              config={{ displayModeBar: false }}
              layout={{
                height: ganttData.length * 30 + 80,
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
                  l: 150,
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
