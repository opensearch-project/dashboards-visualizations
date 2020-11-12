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

  public start() {}
  public stop() {}
}

export type CustomVisualizationsSetup = ReturnType<CustomVisualizationsPublicPlugin['setup']>;
export type CustomVisualizationsStart = ReturnType<CustomVisualizationsPublicPlugin['start']>;
