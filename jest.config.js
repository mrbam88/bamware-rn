const { transform } = require("@babel/core")

// jest.config.js
module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|react-native-reanimated)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "<rootDir>/jest.setup.env.js", // This file sets env vars before anything else
  ],
  setupFilesAfterEnv: [
    "<rootDir>/test/setup.ts", // Main setup file runs after env is set
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/*.stories.*",
    "!app/styles/**/*",
    "!app/utils/ignite/**/*",
    "!app/utils/reactotron/**/*",
  ],
  modulePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/app/__mocks__/", "<rootDir>/test"],
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      babelConfig: true,
      isolatedModules: true,
    },
  },
  // Make test results less verbose
  verbose: false,

  // Hide coverage reports in console (still generates them)
  coverageReporters: ["json", "lcov"],

  // Limit console output from tests
  silent: false, // Set to true to suppress ALL console output

  // Only show failing tests
  // reporters: ["jest-silent-reporter"]
}
