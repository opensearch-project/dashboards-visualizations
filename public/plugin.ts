import { CoreSetup, Plugin, CoreStart, IUiSettingsClient, HttpSetup } from 'kibana/public';
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';
import { getGanttVisDefinition } from './gantt_vis_type';

export interface SetupDependencies {
  visualizations: VisualizationsSetup;
}

export interface GanttVisDependencies extends Partial<CoreStart> {
  uiSettings: IUiSettingsClient;
  http: HttpSetup;
}

export class CustomVisualizationsPublicPlugin
  implements Plugin<CustomVisualizationsSetup, CustomVisualizationsStart> {
  public setup(core: CoreSetup, setupDeps: SetupDependencies) {
    const dependencies: GanttVisDependencies = {
      uiSettings: core.uiSettings,
      http: core.http,
    };
    setupDeps.visualizations.createReactVisualization(getGanttVisDefinition(dependencies));
  }

  public start() { }
  public stop() { }
}

export type CustomVisualizationsSetup = ReturnType<CustomVisualizationsPublicPlugin['setup']>;
export type CustomVisualizationsStart = ReturnType<CustomVisualizationsPublicPlugin['start']>;
