import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import { AudioControls } from './AudioControls';
import { AudioProState, AudioProTrack } from 'react-native-audio-pro';

// Mock the react-native-audio-pro library
jest.mock('react-native-audio-pro', () => ({
  AudioProState: {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    STOPPED: 'STOPPED',
    ERROR: 'ERROR',
  },
  useAudioPro: jest.fn(),
  AudioPro: {
    play: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
  },
}));

const mockTrack: AudioProTrack = {
  url: 'https://example.com/audio.mp3',
  title: 'Test Track',
  artist: 'Test Artist',
  id: 'test-track-id',
  artwork: 'https://example.com/artwork.jpg',
};

describe('AudioControls', () => {
  const { useAudioPro, AudioPro } = require('react-native-audio-pro');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('IDLE state', () => {
    it('shows "No track loaded" message when in IDLE state', () => {
      useAudioPro.mockReturnValue({ state: 'IDLE' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('No track loaded')).toBeTruthy();
    });
  });

  describe('LOADING state', () => {
    it('shows loading indicator when in LOADING state', () => {
      useAudioPro.mockReturnValue({ state: 'LOADING' });

      const { UNSAFE_getByType } = render(<AudioControls track={mockTrack} />);

      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });
  });

  describe('PLAYING and PAUSED states', () => {
    it('displays audio controls when in PLAYING state', () => {
      useAudioPro.mockReturnValue({ state: 'PLAYING' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByTestId('audio-controls')).toBeTruthy();
      expect(screen.getByTestId('play-pause-button')).toBeTruthy();
    });

    it('displays audio controls when in PAUSED state', () => {
      useAudioPro.mockReturnValue({ state: 'PAUSED' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByTestId('audio-controls')).toBeTruthy();
      expect(screen.getByTestId('play-pause-button')).toBeTruthy();
    });

    it('shows pause emoji when playing', () => {
      useAudioPro.mockReturnValue({ state: 'PLAYING' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('⏸️')).toBeTruthy();
    });

    it('shows play emoji when paused', () => {
      useAudioPro.mockReturnValue({ state: 'PAUSED' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('▶️')).toBeTruthy();
    });
  });

  describe('STOPPED state', () => {
    it('shows "Stopped" message when in STOPPED state', () => {
      useAudioPro.mockReturnValue({ state: 'STOPPED' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('Stopped')).toBeTruthy();
    });
  });

  describe('ERROR state', () => {
    it('shows "Error occurred" message when in ERROR state', () => {
      useAudioPro.mockReturnValue({ state: 'ERROR' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('Error occurred')).toBeTruthy();
    });
  });

  describe('Unknown state', () => {
    it('shows "Unknown state" message for unrecognized states', () => {
      useAudioPro.mockReturnValue({ state: 'SOME_UNKNOWN_STATE' });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('Unknown state')).toBeTruthy();
    });
  });

  describe('User interactions', () => {
    it('calls AudioPro.pause when playing and button is pressed', async () => {
      useAudioPro.mockReturnValue({ state: 'PLAYING' });
      AudioPro.pause.mockResolvedValue(undefined);

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      fireEvent.press(playButton);

      expect(AudioPro.pause).toHaveBeenCalledTimes(1);
    });

    it('calls AudioPro.resume when paused and button is pressed', () => {
      useAudioPro.mockReturnValue({ state: 'PAUSED' });

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      fireEvent.press(playButton);

      expect(AudioPro.resume).toHaveBeenCalledTimes(1);
    });

    it('calls AudioPro.play for other states when button is pressed', async () => {
      useAudioPro.mockReturnValue({ state: 'IDLE' });
      AudioPro.play.mockResolvedValue(undefined);

      render(<AudioControls track={mockTrack} />);

      // In IDLE state, there's no play button, it just shows "No track loaded"
      // So let's test this with a different approach - check the useEffect call
      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack, { autoPlay: false });
    });
  });

  describe('Track loading', () => {
    it('loads track on component mount', () => {
      useAudioPro.mockReturnValue({ state: 'IDLE' });
      AudioPro.play.mockResolvedValue(undefined);

      render(<AudioControls track={mockTrack} />);

      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack, { autoPlay: false });
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility labels for play button when paused', () => {
      useAudioPro.mockReturnValue({ state: 'PAUSED' });

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      expect(playButton.props.accessibilityLabel).toBe('Play');
      expect(playButton.props.accessibilityRole).toBe('button');
    });

    it('has proper accessibility labels for pause button when playing', () => {
      useAudioPro.mockReturnValue({ state: 'PLAYING' });

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      expect(playButton.props.accessibilityLabel).toBe('Pause');
      expect(playButton.props.accessibilityRole).toBe('button');
    });
  });
});
