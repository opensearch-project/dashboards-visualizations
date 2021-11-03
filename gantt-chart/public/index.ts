/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.scss';

import { PluginInitializer } from 'opensearch-dashboards/public';
import {
  CustomVisualizationsPublicPlugin,
  CustomVisualizationsSetup,
  CustomVisualizationsStart,
} from './plugin';

export { CustomVisualizationsPublicPlugin as Plugin };

export const plugin: PluginInitializer<CustomVisualizationsSetup, CustomVisualizationsStart> = () =>
  new CustomVisualizationsPublicPlugin();
