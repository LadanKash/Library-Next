// jest.config.js
module.exports = {
    testEnvironment: 'jsdom', // Use 'jsdom' for React testing
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  