// eslint.config.mjs

import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jestEslint from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        process: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      'jest': jestEslint,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      ...jestEslint.configs.recommended.rules,
      'max-len': ['error', { code: 120 }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
    },
    ignores: ['node_modules/', 'dist/'],
  },
];
