import config from '@fe-app/jest-config';
import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from 'jest';
import tsConfig from './tsconfig.json';

export default {
  ...config,
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  moduleNameMapper: pathsToModuleNameMapper(
    tsConfig.compilerOptions.paths,
    { prefix: '<rootDir>/' },
  ),
} as Config;
