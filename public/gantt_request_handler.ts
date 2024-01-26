/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IUiSettingsClient } from 'opensearch-dashboards/public';
import { IndexPattern } from 'src/plugins/data/public';
import { VisParams } from 'src/plugins/visualizations/public';
import { buildOpenSearchQuery, Filter, Query, TimeRange, getTime } from '../../../src/plugins/data/common';
import { GanttVisDependencies } from './plugin';

interface GanttRequestHandlerDeps {
  timeRange: TimeRange;
  filters: Filter[];
  query: Query;
  index: IndexPattern;
  visParams: VisParams;
  forceFetch?: boolean;
}

const constructRequest = (
  uiSettings: IUiSettingsClient,
  { timeRange, filters, query, index, visParams }: GanttRequestHandlerDeps
) => {
  const DSL = buildOpenSearchQuery(index, query, filters);
  const request: any = {
    index: index.title,
    size: visParams.size,
    body: {
      sort: [] as any,
      query: DSL,
    },
  };

  const timeFilter = getTime(index, timeRange);
  if (timeFilter && timeFilter.range) {
    request.body.query.bool.must.push({
      range: timeFilter.range,
    });
  }

  if (visParams.startTimeField) {
    request.body.sort.push({
      [visParams.startTimeField]: {
        order: 'desc',
      },
    });
  }
  return request;
};

export const getGanttRequestHandler = ({ uiSettings, http }: GanttVisDependencies) => {
  return async (params: GanttRequestHandlerDeps) => {
    const request = constructRequest(uiSettings, params);
    return http
      .post('../api/gantt_vis/query', {
        body: JSON.stringify(request),
      })
      .catch((error) => console.error(error));
  };
};
