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

jest.mock('react-native-audio-pro', () => {
  const AudioProState = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    STOPPED: 'STOPPED',
    ERROR: 'ERROR',
  };
  return {
    AudioPro: {
      play: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
    },
    AudioProState,
    useAudioPro: () => ({
      state: AudioProState.LOADING, // Simulate loading state for initial render
    }),
  };
});

// Optionally, if NativeEventEmitter is still causing issues, add:
// jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
//   return jest.fn().mockImplementation(() => ({
//     addListener: jest.fn(),
//     removeListener: jest.fn(),
//     removeAllListeners: jest.fn(),
//     emit: jest.fn(),
//   }));
// });

// Global test setup
global.__DEV__ = true;
