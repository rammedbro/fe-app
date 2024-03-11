import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  passWithNoTests: true,
  testTimeout: 10000,
  testEnvironment: 'node',
  transform: {
    '.(ts|tsx)': ['ts-jest', { diagnostics: false }],
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary'],
};

export default config;
