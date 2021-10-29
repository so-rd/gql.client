/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/src/**/schemas/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/providers/*',
    '!src/tests/**',
    '!src/reportWebVitals.ts',
    '!src/styles/**',
    '!src/components/ScrollToTop/*',
    '!src/components/ScrollToTopOnMount/*',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', path.join(__dirname, '')],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
};
