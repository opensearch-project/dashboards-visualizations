import { CoreSetup, Plugin } from 'kibana/public';
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';
import { GanttChartEditor } from './components/gantt_chart_editor';
import { GanttChart } from './components/gantt_chart';

export interface SetupDependencies {
  visualizations: VisualizationsSetup;
}

export class CustomVisualizationsPublicPlugin
  implements Plugin<CustomVisualizationsSetup, CustomVisualizationsStart> {
  public setup(core: CoreSetup, setupDeps: SetupDependencies) {
    setupDeps.visualizations.createReactVisualization({
      name: 'gantt_vis',
      title: 'Gantt Chart',
      icon: 'visBarHorizontalStacked',
      description:
        'This visualization allows you to create a Gantt chart.',
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
      editorConfig: {
        optionTabs: [
          {
            name: 'editor',
            title: 'Editor',
            editor: GanttChartEditor,
          },
        ],
      },
      requestHandler: 'none',
    });
  }

  public start() { }
  public stop() { }
}

export type CustomVisualizationsSetup = ReturnType<CustomVisualizationsPublicPlugin['setup']>;
export type CustomVisualizationsStart = ReturnType<CustomVisualizationsPublicPlugin['start']>;
