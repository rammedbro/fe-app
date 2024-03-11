import type { Linter } from 'eslint';

const config = {
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: [
    'node_modules',
    'dist',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    curly: ['error', 'multi-line'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'eqeqeq': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'error',
    'no-new': 'error',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-prototype-builtins': 'error',

    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2, {
      'SwitchCase': 1,
      ignoredNodes: ['TSTypeParameterInstantiation'],
    }],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'error',
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'error',
    'key-spacing': 'off',
    '@typescript-eslint/key-spacing': ['error', { mode: 'strict' }],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { before: true }],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': [
      'error',
      'always',
    ],
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      { blankLine: 'never', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: '*', next: ['return', 'function'] },
      { blankLine: 'always', prev: 'function', next: '*' },
    ],
    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': 'error',
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-assertions': 'error',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
} as Linter.Config;

export = config;
