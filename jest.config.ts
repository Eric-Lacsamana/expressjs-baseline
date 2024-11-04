import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/test/unit/**/*.[jt]s?(x)", // Match unit test files
    "**/test/integration/**/*.[jt]s?(x)", // Match integration test files
    "**/?(*.)+(spec|test).[tj]s?(x)" // Match any .test.js or .spec.js files
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
    "/src/tests/utils/"
  ],
  coverageDirectory: "coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts"
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional setup file
};

export default config;
