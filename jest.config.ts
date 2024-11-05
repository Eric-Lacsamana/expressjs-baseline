import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // TypeScript support using ts-jest preset
    testEnvironment: 'node', // Use node environment for tests
    testPathIgnorePatterns: [
        '/node_modules/', // Ignore node_modules
        '/dist/', // Ignore dist/ directory
        '/build/', // Ignore build/ directory
        '/src/__tests__/utils/', // Ignore all tests in the utils folder
    ],
    coverageDirectory: 'coverage', // Directory to output coverage reports
    collectCoverage: true, // Collect coverage information
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}', // Collect coverage for all TypeScript files
        '!src/**/*.d.ts', // Exclude type declaration files
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Optional setup file for global setups,
};

export default config;

// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testMatch: [
//     '**/test/unit/**/*.[jt]s?(x)', // Match unit test files
//     '**/test/integration/**/*.[jt]s?(x)', // Match integration test files
//     '**/?(*.)+(spec|test).[tj]s?(x)' // Match any .test.js or .spec.js files
//   ],
//   testPathIgnorePatterns: [
//     '/node_modules/',
//     '/dist/',
//     '/build/',
//     '/src/tests/utils/'
//   ],
//   coverageDirectory: 'coverage',
//   collectCoverage: true,
//   collectCoverageFrom: [
//     'src/**/*.{ts,tsx}',
//     '!src/**/*.d.ts'
//   ],
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Optional setup file
// };

// export default config;
