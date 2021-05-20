/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
export default {
    coverageProvider: "v8",

    moduleFileExtensions: ["js", "ts", "cjs"],

    testMatch: [
      "**/__tests__/**/*.?(c)[jt]s?(x)",
      "**/?(*.)+(spec|test).?(c)[tj]s?(x)",
      "!**/fixtures/**"
    ],

    testRunner: "jest-circus/runner",

    transform: {
        "^.+\\.ts$": "esbuild-jest",
        "^.+\\.js$": "esbuild-jest",
    },
};
