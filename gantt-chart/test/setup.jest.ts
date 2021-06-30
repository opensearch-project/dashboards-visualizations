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

// import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-subj' });

window.URL.createObjectURL = () => '';
window.scrollTo = jest.fn();

HTMLCanvasElement.prototype.getContext = jest.fn();

jest.mock('../../../src/plugins/data/common', () => ({
  buildOpenSearchQuery: jest.fn(() => ({
    bool: { must: [] },
  })),
  Filter: jest.fn(),
  Query: jest.fn(),
  TimeRange: jest.fn(),
  getTime: jest.fn(() => ({
    range: 'test-range',
  })),
}));

jest.mock('@elastic/eui/lib/components/form/form_row/make_id', () => () => 'random-id');

jest.mock('@elastic/eui/lib/services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => {
    return () => 'random_html_id';
  },
}));
