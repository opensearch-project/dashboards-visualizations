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

import { IUiSettingsClient } from 'kibana/public';
import { IndexPattern } from 'src/plugins/data/public';
import { VisParams } from 'src/plugins/visualizations/public';
import { buildEsQuery, Filter, Query, TimeRange } from '../../../src/plugins/data/common';
import { calculateBounds } from '../../../src/plugins/data/public/query/timefilter/get_time';
import { getTimezone } from '../../../src/plugins/vis_type_timeseries/public/application/lib/get_timezone';
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
  const DSL = buildEsQuery(index, query, filters);
  const request = {
    index: index.title,
    size: visParams.size,
    body: {
      sort: [] as any,
      query: DSL,
    },
  };

  if (visParams.startTimeField) {
    const timeZone = getTimezone(uiSettings);
    const parsedTimeRange = calculateBounds(timeRange);

    // request.body.query.bool.must.push({
    //   range: {
    //     timestamp: {
    //       gte: parsedTimeRange.min,
    //       lte: parsedTimeRange.max,
    //       time_zone: timeZone,
    //     },
    //   },
    // });

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
