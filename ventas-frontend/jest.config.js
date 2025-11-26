export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'], // ← nuevo
    setupFilesAfterEnv: ['./setupTests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/sr/$1',
        // Mock MSW completamente para evitar problemas ESM
        '^msw/node$': '<rootDir>/__mocks__/msw.js',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: ["node_modules/"],
    modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/.+\\.js$'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testMatch: ['**/tests/**/*.test.ts?(x)'],
};
