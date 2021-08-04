/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
export default {
  coverageProvider: 'v8',

  moduleFileExtensions: ['js', 'ts', 'cjs'],

  testMatch: ['**/?(*.)+(spec|test).?(c)[tj]s?(x)'],

  testRunner: 'jest-circus/runner',

  transform: {
    '^.+\\.ts$': 'esbuild-jest'
  }
}
