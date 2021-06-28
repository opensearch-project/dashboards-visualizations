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

import { HttpSetup } from 'opensearch-dashboards/public';

const httpClientMock = jest.fn() as any;

httpClientMock.delete = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));
httpClientMock.get = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));
httpClientMock.head = jest.fn();
httpClientMock.post = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));
httpClientMock.put = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));

export default httpClientMock as HttpSetup;
