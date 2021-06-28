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
import { OptionsEditor } from '../options_editor';

describe('<OptionsEditor /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const setValue = jest.fn();
    const utils = render(<OptionsEditor {...mockEditorProps(setValue)} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the component with different options', () => {
    const setValue = jest.fn();
    const props = mockEditorProps(setValue);
    props.stateParams = {
      ...props.stateParams,
      showLegend: false,
      yAxisShowTitle: false,
      xAxisShowTitle: false,
    };
    const utils = render(<OptionsEditor {...props} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('sets legends', () => {
    const setValue = jest.fn();
    const utils = render(<OptionsEditor {...mockEditorProps(setValue)} />);
    const orientation = utils.getByTestId('options-editor-legend-orientation-select');
    fireEvent.change(orientation, { target: { value: 'h' } });
    expect(setValue).toBeCalledWith('legendOrientation', 'h');
    utils.getByTestId('options-editor-legend-switch').click();
    expect(setValue).toBeCalledWith('showLegend', false);
  });

  it('toggles grid y axis lines', () => {
    const setValue = jest.fn();
    const utils = render(<OptionsEditor {...mockEditorProps(setValue)} />);
    utils.getByTestId('options-editor-grid-y-switch').click();
    expect(setValue).toBeCalledWith('yAxisShowGrid', true);
  });

  it('toggles grid x axis lines', () => {
    const setValue = jest.fn();
    const utils = render(<OptionsEditor {...mockEditorProps(setValue)} />);
    utils.getByTestId('options-editor-grid-x-switch').click();
    expect(setValue).toBeCalledWith('xAxisShowGrid', false);
  });

  it('sets y axis', () => {
    const setValue = jest.fn();
    const utils = render(<OptionsEditor {...mockEditorProps(setValue)} />);
    fireEvent.change(utils.getByTestId('options-editor-y-axis-position-select'), {
      target: { value: 'right' },
    });
    expect(setValue).toBeCalledWith('yAxisPosition', 'right');

    fireEvent.change(utils.getByTestId('options-editor-y-axis-label-input'), {
      target: { value: 'test-label' },
    });
    expect(setValue).toBeCalledWith('yAxisTitle', 'test-label');

    fireEvent.click(utils.getByTestId('options-editor-y-axis-switch'));
    expect(setValue).toBeCalledWith('yAxisShowLine', false);

    fireEvent.click(utils.getByTestId('options-editor-y-axis-label-switch'));
    expect(setValue).toBeCalledWith('yAxisShowTitle', false);
  });

  it('sets x axis', () => {
    const setValue = jest.fn();
    const utils = render(<OptionsEditor {...mockEditorProps(setValue)} />);
    fireEvent.change(utils.getByTestId('options-editor-x-axis-position-select'), {
      target: { value: 'top' },
    });
    expect(setValue).toBeCalledWith('xAxisPosition', 'top');

    fireEvent.change(utils.getByTestId('options-editor-x-axis-scale-type-select'), {
      target: { value: 'log' },
    });
    expect(setValue).toBeCalledWith('xAxisType', 'log');

    fireEvent.change(utils.getByTestId('options-editor-x-axis-time-format-select'), {
      target: { value: 'MM/DD hh:mm:ss A' },
    });
    expect(setValue).toBeCalledWith('timeFormat', 'MM/DD hh:mm:ss A');

    fireEvent.change(utils.getByTestId('options-editor-x-axis-label-input'), {
      target: { value: 'test-label' },
    });
    expect(setValue).toBeCalledWith('xAxisTitle', 'test-label');

    fireEvent.click(utils.getByTestId('options-editor-x-axis-switch'));
    expect(setValue).toBeCalledWith('xAxisShowLine', false);

    fireEvent.click(utils.getByTestId('options-editor-x-axis-label-switch'));
    expect(setValue).toBeCalledWith('xAxisShowTitle', false);
  });
});
