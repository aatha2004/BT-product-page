module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Specify the jsdom environment
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest', // Use babel-jest for TypeScript files
      '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    moduleDirectories: ['node_modules', 'src'], // Allow imports from src directory
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)', // Look for test files in __tests__ folder
      '**/?(*.)+(spec|test).[tj]s?(x)', // Look for .test or .spec files
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for jest-dom
  };