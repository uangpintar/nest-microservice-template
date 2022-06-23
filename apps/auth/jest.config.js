/* eslint-disable @typescript-eslint/no-var-requires */
const { name } = require('./package.json');

const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('../../tsconfig.json');

module.exports = {
  rootDir: '.',
  displayName: name,
  name,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: [
    'main.ts',
    'swagger.ts',
    'node_modules',
    'module.ts',
    'interface.ts',
  ],
  setupFilesAfterEnv: ['./tests/initialization.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../',
  }),
};
