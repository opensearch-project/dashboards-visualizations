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

import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { mockGanttProps } from '../../../test/mocks/mockData';
import { GanttChart } from '../gantt_chart';

describe('<GanttChart /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const props = mockGanttProps();
    const utils = render(<GanttChart {...props} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });
  
  it('renders empty prompt when no field is selected', () => {
    const props = mockGanttProps();
    props.visParams = {
      ...props.visParams,
      labelField: '',
    };
    const utils = render(<GanttChart {...props} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders empty prompt when no data is returned', () => {
    const props = mockGanttProps();
    props.visData.source = [];
    const utils = render(<GanttChart {...props} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the component with different props', () => {
    const props = mockGanttProps();
    props.visData.source = props.visData.source.map(({ spanId, startTime, duration }) => ({
      spanId: '',
      duration: duration * 1000,
      startTime: startTime * 1000,
    }));
    props.visParams = {
      ...props.visParams,
      xAxisPosition: 'top',
      yAxisPosition: 'right',
      legendOrientation: 'h',
      xAxisShowTitle: false,
      yAxisShowTitle: false,
    }
    const utils = render(<GanttChart {...props} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });
});
