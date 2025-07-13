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

// Mock react-native-track-player
jest.mock('react-native-track-player', () => ({
  setupPlayer: jest.fn(() => Promise.resolve()),
  add: jest.fn(() => Promise.resolve()),
  play: jest.fn(() => Promise.resolve()),
  pause: jest.fn(() => Promise.resolve()),
  stop: jest.fn(() => Promise.resolve()),
  reset: jest.fn(() => Promise.resolve()),
  getState: jest.fn(() => Promise.resolve('stopped')),
  getPosition: jest.fn(() => Promise.resolve(0)),
  getDuration: jest.fn(() => Promise.resolve(0)),
  updateOptions: jest.fn(() => Promise.resolve()),
  useProgress: jest.fn(() => ({ position: 0, duration: 0, buffered: 0 })),
  usePlaybackState: jest.fn(() => 'stopped'),
  useTrackPlayerEvents: jest.fn(),
  State: {
    None: 'none',
    Stopped: 'stopped',
    Paused: 'paused',
    Playing: 'playing',
    Ready: 'ready',
    Buffering: 'buffering',
  },
  Event: {
    PlaybackState: 'playback-state',
    PlaybackError: 'playback-error',
  },
}));

// Mock Image component require calls
jest.mock('../src/assets/images/alice-cover.jpg', () => 'alice-cover.jpg', {
  virtual: true,
});

// Global test setup
global.__DEV__ = true;
