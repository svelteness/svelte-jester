/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
export default {
  coverageProvider: 'v8',

  extensionsToTreatAsEsm: ['.ts'],

  moduleFileExtensions: ['js', 'ts', 'cjs'],

  testMatch: ['**/?(*.)+(spec|test).?(c)[tj]s?(x)'],

  transform: {
    '^.+\\.ts$': 'esbuild-jest'
  }
}
