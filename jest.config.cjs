module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    '^.+\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
