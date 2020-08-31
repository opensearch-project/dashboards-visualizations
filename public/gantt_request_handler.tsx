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

const constructRequest = (uiSettings: IUiSettingsClient, {
  timeRange,
  filters,
  query,
  index,
  visParams,
}: GanttRequestHandlerDeps) => {
  const DSL = buildEsQuery(index, query, filters);
  const request = {
    index: index.title,
    size: visParams.size,
    body: {
      sort: [] as any,
      query: DSL,
    }
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
        "order": "desc"
      }
    });
  }
  return request;
}

export const getGanttRequestHandler = ({
  uiSettings,
  http
}: GanttVisDependencies) => {
  return async (params: GanttRequestHandlerDeps) => {
    const request = constructRequest(uiSettings, params);
    return await http.post('../api/gantt_vis/query', {
      body: JSON.stringify(request),
    });
  };
};