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

import { schema } from '@osd/config-schema';
import { RequestParams } from '@elastic/elasticsearch';
import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/gantt_vis/query',
      validate: {
        body: schema.object({
          index: schema.string(),
          size: schema.number(),
          body: schema.object({
            query: schema.maybe(
              schema.object({
                bool: schema.object({
                  filter: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                  must: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                  should: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                  must_not: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                }),
              })
            ),
            sort: schema.maybe(schema.arrayOf(schema.any())),
          }),
        }),
      },
    },
    async (context, request, response) => {
      const { index, size, ...rest } = request.body;
      const params: RequestParams.Search = {
        index,
        size,
        ...rest,
      };
      try {
        const resp = await context.core.opensearch.legacy.client.callAsCurrentUser(
          'search',
          params
        );
        return response.ok({
          body: {
            total: resp.hits.total.value,
            hits: resp.hits.hits,
          },
        });
      } catch (error) {
        console.error(error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
