/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import _ from 'lodash';
import moment from 'moment';
import { PlotData } from 'plotly.js';
import React, { Fragment, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { EuiEmptyPrompt, EuiText } from '@elastic/eui';
import { UiSettingsClient } from 'src/core/public/ui_settings';
import { ExprVis } from 'src/plugins/visualizations/public';
import { GanttParams, GanttSuccessResponse } from '../gantt_vis_type';
import { v1 as uuid } from 'uuid';

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
  const getGanttData = (): { data: PlotData[], tickvals: number[], ticktext: string[], yLabels: string[], yTexts: string[] } => {
    const source: any[] = visData.source;
    const data: PlotData[] = [];
    if (source.length === 0) return { data, tickvals: [], ticktext: [] };

    const getStartTime =
      typeof _.get(source[0], visParams.startTimeField) === 'string'
        ? (document: any): number => Date.parse(_.get(document, visParams.startTimeField))
        : (document: any): number => _.get(document, visParams.startTimeField);

    // source is ordered by startTimeField desc, last trace in source is the earliest trace and should start at 0
    const minStartTime: number = getStartTime(source[source.length - 1]);
    let maxEndTime: number = 0;

    source.forEach((document) => {
      const rawStartTime: number = getStartTime(document);
      // subtract with start time of earliest trace to get relative start time
      const startTime: number = rawStartTime - minStartTime;
      const duration: number = _.get(document, visParams.durationField);
      maxEndTime = Math.max(maxEndTime, rawStartTime + duration);

      const label: string = _.get(document, visParams.labelField);
      const uniqueLabel: string = label + uuid();
      data.push(
        {
          x: [startTime],
          y: [uniqueLabel],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          marker: { color: 'rgba(0, 0, 0, 0)' },
          hoverinfo: 'none',
          showlegend: false,
        } as PlotData,
        {
          x: [duration],
          y: [uniqueLabel],
          type: 'bar',
          orientation: 'h',
          width: 0.4,
          name: label || 'undefined',
          text: [duration && duration.toString()],
          hovertemplate: '%{text}<extra></extra>',
          marker: {
            color: visParams.colors,
          },
        } as PlotData
      );
    });

    // get unique labels from traces
    const yLabels = data.map((d) => d.y[0]).filter((label, i, self) => self.indexOf(label) === i);
    // remove uuid when displaying y-ticks
    const yTexts = yLabels.map((label) => label.substring(0, label.length - 36));
    return { data, ...getTicks(minStartTime, maxEndTime), yLabels, yTexts };
  };

  const getTicks = (minStartTime: number, maxEndTime: number) => {
    const ticks = 5;
    const interval = Math.round((maxEndTime - minStartTime) / ticks);
    const tickvals = Array.from({ length: ticks }, (v, i: number) => interval * i);
    const ticktext = tickvals.map((val: number) => toTimeString(val + minStartTime));
    return { tickvals, ticktext };
  };

  const toTimeString = (val: number) => {
    let divisor = 1;
    const valStr = Math.floor(val).toString();
    if (valStr.length <= 10)  // unit is seconds
      divisor = 0.001;
    else if (valStr.length <= 13)  // unit is milliseconds
      divisor = 1;
    else if (valStr.length <= 16)  // unit is microseconds
      divisor = 1000
    else if (valStr.length <= 19)  // unit is nanoseconds
      divisor = 1000 * 1000;
    return moment(val / divisor).format(visParams.timeFormat);
  };

  const ganttData = getGanttData();
  
  // workaround to disable 'data-loading' filter effects
  useEffect(() => {
    let node = document.querySelector('#plotly-gantt-chart');
    while (node?.tagName !== 'HTML') {
      if (node?.className.includes('visEditor')) {
        break;
      }
      if (node?.getAttribute('data-loading')) {
        node.setAttribute('data-type', 'plotlyGanttChart')
        break;
      }
      node = node.parentNode;
    }
  }, []);

  return (
    <>
      {visParams.labelField && visParams.startTimeField && visParams.durationField && ganttData.data.length > 0 ? (
        <Plot
          divId="plotly-gantt-chart"
          data={ganttData.data}
          style={{ width: '100%', height: '100%' }}
          config={{ displayModeBar: false }}
          layout={{
            height: ganttData.data.length * 30 + 80,
            autosize: true,
            barmode: 'stack',
            margin: {
              t: visParams.xAxisPosition === 'top' ? 80 : 30,
              b: visParams.xAxisPosition === 'bottom' ? 80 : 30,
              l: visParams.yAxisPosition === 'left' ? 150 : 30,
              r: visParams.yAxisPosition === 'right' ? 150 + (visParams.legendOrientation === 'v' ? 150 : 0) : 30,
            },
            showlegend: visParams.showLegend,
            legend: {
              orientation: visParams.legendOrientation,
              x: visParams.legendOrientation === 'h' ? 0 : visParams.yAxisPosition === 'right' ? 1.23 : 1.02,
              traceorder: 'normal',
            },
            xaxis: {
              side: visParams.xAxisPosition,
              title: visParams.xAxisShowTitle ? visParams.xAxisTitle : '',
              type: visParams.xAxisType,
              showticklabels: visParams.xAxisShow,
              showgrid: visParams.xAxisShowGrid,
              showline: visParams.xAxisShowLine,
              zeroline: false,
              tickmode: "array",
              tickvals: ganttData.tickvals,
              ticktext: ganttData.ticktext,
            },
            yaxis: {
              side: visParams.yAxisPosition,
              title: visParams.yAxisShowTitle ? visParams.yAxisTitle : '',
              showline: visParams.yAxisShowLine,
              zeroline: false,
              type: 'category',
              showticklabels: visParams.yAxisShow,
              showgrid: visParams.yAxisShowGrid,
              tickvals: ganttData.yLabels,
              ticktext: ganttData.yTexts,
            },
          }}
        />
      ) : (
          visParams.labelField && visParams.startTimeField && visParams.durationField ?
            (<EuiEmptyPrompt
              title={<h2>No data</h2>}
              body={<EuiText>No data matching the selected filter.</EuiText>}
            />
            ) : (
              <EuiEmptyPrompt
                title={<h2>No data</h2>}
                body={<EuiText>Specify data to plot the chart using the Data & Options panel<br />on the right.</EuiText>}
              />
            ))}
    </>
  );
}
