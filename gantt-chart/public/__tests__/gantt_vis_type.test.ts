/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { MockStateParams } from '../../test/mocks/mockData';
import { getGanttVisDefinition } from '../gantt_vis_type';
import { GanttVisDependencies } from '../plugin';

describe('Test vis type', () => {
  const MOCK_RESPONSE = {
    total: 25,
    hits: [
      {
        _source: { field: 'test' },
        _index: 'test-index',
        _type: 'test-type',
        _id: 'test-id',
        _score: 0,
      },
    ],
  };
  const httpClient = jest.fn() as any;
  httpClient.post = jest.fn(() => Promise.resolve(MOCK_RESPONSE));

  it('returns vis type', async () => {
    const dependencies = ({
      uiSettings: jest.fn(),
      http: httpClient,
    } as unknown) as GanttVisDependencies;
    const ganttVisDefinition = getGanttVisDefinition(dependencies);

    const request = await ganttVisDefinition.requestHandler({
      timeRange: { from: 'now-15m', to: 'now' },
      filters: [],
      index: jest.fn() as any,
      query: [] as any,
      visParams: MockStateParams,
    });
    expect(request).toEqual(MOCK_RESPONSE);
    expect(httpClient.post).toBeCalledWith('../api/gantt_vis/query', {
      body:
        '{"size":10,"body":{"sort":[{"startTime":{"order":"desc"}}],"query":{"bool":{"must":[{"range":"test-range"}]}}}}',
    });

    const response = await ganttVisDefinition.responseHandler(MOCK_RESPONSE);
    expect(response).toEqual({
      source: [
        {
          field: 'test',
        },
      ],
      total: 25,
    });
  });

  it('catches errors', async () => {
    httpClient.post = jest.fn(() => Promise.reject('test-error'));
    console.error = jest.fn();
    const dependencies = ({
      uiSettings: jest.fn(),
      http: httpClient,
    } as unknown) as GanttVisDependencies;
    const ganttVisDefinition = getGanttVisDefinition(dependencies);

    const request = await ganttVisDefinition.requestHandler({
      timeRange: { from: 'now-15m', to: 'now' },
      filters: [],
      index: jest.fn() as any,
      query: [] as any,
      visParams: MockStateParams,
    });
    expect(request).toEqual(undefined);
    expect(console.error).toBeCalledWith('test-error');
  });
});
