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

import { fireEvent, render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { mockEditorProps } from '../../../test/mocks/mockData';
import { GanttChartEditor } from '../gantt_chart_editor';

describe('<GanttChartEditor /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const setValue = jest.fn();
    const utils = render(<GanttChartEditor {...mockEditorProps(setValue)} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('changes label field', () => {
    const setValue = jest.fn();
    const props = mockEditorProps(setValue);
    props.stateParams.labelField = '';
    const utils = render(<GanttChartEditor {...props} />);
    utils.getByTestId('gantt-chart-editor-label-field').click();
    utils.getByText('test-field-1').click();
    expect(setValue).toBeCalledWith('labelField', 'test-field-1');
  });

  it('changes start time field', () => {
    const setValue = jest.fn();
    const utils = render(<GanttChartEditor {...mockEditorProps(setValue)} />);
    utils.getByTestId('gantt-chart-editor-start-time-field').click();
    utils.getByText('test-field-2').click();
    expect(setValue).toBeCalledWith('startTimeField', 'test-field-2');
  });

  it('changes duration field', () => {
    const setValue = jest.fn();
    const utils = render(<GanttChartEditor {...mockEditorProps(setValue)} />);
    utils.getByTestId('gantt-chart-editor-duration-field').click();
    utils.getByText('test-field-3').click();
    expect(setValue).toBeCalledWith('durationField', 'test-field-3');
  });

  it('changes size field', () => {
    const setValue = jest.fn();
    const utils = render(<GanttChartEditor {...mockEditorProps(setValue)} />);
    const field = utils.getByTestId('gantt-chart-editor-size-field');
    fireEvent.change(field, { target: { value: 3 } });
    expect(setValue).toBeCalledWith('size', 3);
  });
});
