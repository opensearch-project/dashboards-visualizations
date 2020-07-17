import { PluginInitializerContext } from '../../../src/core/server';
import { GanttVisPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new GanttVisPlugin(initializerContext);
}

export { GanttVisPluginSetup, GanttVisPluginStart } from './types';
