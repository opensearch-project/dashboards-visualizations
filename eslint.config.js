/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const osdConfig = require('@elastic/eslint-config-kibana');
const { eui } = require('@elastic/eslint-config-kibana/extras');

const cypressPlugin = require('eslint-plugin-cypress');
const jestPlugin = require('eslint-plugin-jest');

const LICENSE_HEADER = `/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */`;

module.exports = [
  // Replaces .eslintignore (ESLint 10 no longer reads it).
  { ignores: ['node_modules', 'data', 'build', 'target', 'cypress.config.js', '**/*.d.ts'] },
  ...osdConfig,
  ...eui,
  // Register the cypress plugin + globals (the shared config does not register it).
  // The `.cypress/` tests previously relied on a nested `.eslintrc.js` which
  // ESLint 10 no longer reads.
  {
    plugins: { cypress: cypressPlugin },
    languageOptions: {
      globals: { ...cypressPlugin.configs.globals.languageOptions.globals },
    },
  },
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 0,
      '@osd/eslint/no-restricted-paths': [
        'error',
        {
          basePath: __dirname,
          zones: [
            {
              target: ['(public|server)/**/*'],
              from: ['../../packages/**/*', 'packages/**/*'],
            },
          ],
        },
      ],
      '@osd/eslint/require-license-header': ['error', { licenses: [LICENSE_HEADER] }],
    },
  },
  // Jest-based test mocks that don't match the shared config's test-file globs
  // still reference jest globals (e.g. `jest.fn()`).
  {
    files: ['test/mocks/**/*.{js,ts}'],
    languageOptions: {
      globals: { ...jestPlugin.environments.globals.globals },
    },
  },
];
