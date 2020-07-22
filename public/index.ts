import { PluginInitializer } from 'kibana/public';
import {
  CustomVisualizationsPublicPlugin,
  CustomVisualizationsSetup,
  CustomVisualizationsStart,
} from './plugin';

export { CustomVisualizationsPublicPlugin as Plugin };

export const plugin: PluginInitializer<CustomVisualizationsSetup, CustomVisualizationsStart> = () =>
  new CustomVisualizationsPublicPlugin();
