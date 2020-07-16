import { CoreSetup, Plugin } from 'kibana/public';
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';
import { Schemas } from '../../../src/plugins/vis_default_editor/public';
import { ReactVisController } from '../../../src/plugins/visualizations/public/vis_types/react_vis_controller';
import { GanttChartEditor } from './components/gantt_chart_editor';
import { GanttChart } from './components/gantt_chart';

export interface SetupDependencies {
  visualizations: VisualizationsSetup;
}

const myRequestHandler = async (vis) => {
  console.log(vis)
  return null;
};

const myResponseHandler = async (vis, a, b) => {
  console.log(vis, a, b)
  return null;
};

export class CustomVisualizationsPublicPlugin
  implements Plugin<CustomVisualizationsSetup, CustomVisualizationsStart> {
  public setup(core: CoreSetup, setupDeps: SetupDependencies) {
    setupDeps.visualizations.createReactVisualization({
      // setupDeps.visualizations.createBaseVisualization({
      name: 'gantt_vis',
      title: 'Gantt Chart',
      icon: 'visBarHorizontalStacked',
      description:
        'This visualization allows you to create a Gantt chart.',
      // visualization: ReactVisController,
      visConfig: {
        component: GanttChart,
        defaults: {
          data: `{
  "x_start":[1, 2, 5, 6, 11],
  "x_duration": [3, 4, 7, 8, 7],
  "y":[5, 4, 3, 2, 1]
}`,
        },
      },
      // editor: 'default',
      editorConfig: {
        optionsTemplate: GanttChartEditor,
        schemas: new Schemas([
          {
            group: 'metrics',
            name: 'metric',
            title: 'Metric',
            min: 1,
            aggFilter: ['!derivative', '!geo_centroid'],
            defaults: [{ type: 'count', schema: 'metric' }]
          }, {
            group: 'buckets',
            name: 'segment',
            title: 'Bucket Split',
            min: 0,
            max: 1,
            aggFilter: ['!geohash_grid', '!filter']
          }
        ]),
      },
      // requestHandler: myRequestHandler,
      // responseHandler: myResponseHandler,
    });
  }

  public start() { }
  public stop() { }
}

export type CustomVisualizationsSetup = ReturnType<CustomVisualizationsPublicPlugin['setup']>;
export type CustomVisualizationsStart = ReturnType<CustomVisualizationsPublicPlugin['start']>;
