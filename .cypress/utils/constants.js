/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const testDataSet = [
  {
    url: 'https://raw.githubusercontent.com/opensearch-project/dashboards-visualizations/main/gantt-chart/.cypress/utils/jaeger-sample.json',
    index: 'jaeger',
  },
];

export const delay = 1000;
export const GANTT_VIS_NAME = 'A test gantt chart ' + Math.random().toString(36).substring(2);
export const Y_LABEL = 'A unique label for Y-axis';
export const X_LABEL = 'A unique label for X-axis';
export const DEFAULT_SIZE = 10;
