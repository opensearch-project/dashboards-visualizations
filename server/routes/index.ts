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

import { schema } from '@kbn/config-schema';
import { RequestParams } from '@elastic/elasticsearch';
import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/gantt_vis/query',
      validate: {
        body: schema.any(),
        // body: schema.object({
        //   sheet: schema.arrayOf(schema.string()),
        //   extended: schema.maybe(
        //     schema.object({
        //       es: schema.object({
        //         filter: schema.object({
        //           bool: schema.object({
        //             filter: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
        //             must: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
        //             should: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
        //             must_not: schema.maybe(
        //               schema.arrayOf(schema.object({}, { unknowns: 'allow' }))
        //             ),
        //           }),
        //         }),
        //       }),
        //     })
        //   ),
        //   time: schema.maybe(
        //     schema.object({
        //       from: schema.maybe(schema.string()),
        //       interval: schema.string(),
        //       timezone: schema.string(),
        //       to: schema.maybe(schema.string()),
        //     })
        //   ),
        // }),
      },
    },
    async (context, request, response) => {
      const { index, size, ...rest } = request.body;
      const params: RequestParams.Search = {
        index,
        size,
        ...rest,
      };
      const resp = await context.core.elasticsearch.dataClient.callAsInternalUser('search', params);
      return response.ok({
        body: {
          total: resp.hits.total.value,
          hits: resp.hits.hits,
        },
      });
    }
  );
}
