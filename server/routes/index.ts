import { IRouter } from '../../../../src/core/server';
import { schema } from '@kbn/config-schema';
import { Client } from '@elastic/elasticsearch';
import { RequestParams } from '@elastic/elasticsearch';

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/gantt_vis/query',
      validate: {
        body: schema.any()
      },
    },
    async (context, request, response) => {

      // const cluster = context.core.elasticsearch.dataClient.callAsCurrentUser('ping');
      // const params: RequestParams.Search = {
      //   index: 'report',
      //   size: sizeNumber,
      //   sort: `${sortField}:${sortDirection}`,
      // };
      // try {
      //   const esResp = await context.core.elasticsearch.legacy.client.callAsInternalUser(
      //     'search',
      //     params
      //   );
      //   return response.ok({
      //     body: {
      //       total: esResp.hits.total.value,
      //       data: esResp.hits.hits,
      //     },
      //   });
        
      const client = new Client({ node: 'http://localhost:9200' })
      const result = await client.search({
        index: request.body.index,
        body: {
          from: 0,
          size: 20
        }
      })
      
      return response.ok({
        body: {
          body: request.body,
          hits: result.body.hits.hits,
        },
      });
    }
  );
}
