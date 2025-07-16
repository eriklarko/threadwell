import { cleanup } from '@testing-library/react-native';

// Use fake timers to prevent "Jest environment torn down" errors
jest.useFakeTimers();

// Cleanup after each test
afterEach(cleanup);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock Image component require calls
jest.mock('../src/assets/images/alice-cover.jpg', () => 'alice-cover.jpg', {
  virtual: true,
});

// Global test setup
global.__DEV__ = true;
