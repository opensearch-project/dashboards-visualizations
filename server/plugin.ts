import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { GanttVisPluginSetup, GanttVisPluginStart } from './types';
import { defineRoutes } from './routes';

export class GanttVisPlugin implements Plugin<GanttVisPluginSetup, GanttVisPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('gantt_vis: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('gantt_vis: Started');
    return {};
  }

  public stop() {}
}
