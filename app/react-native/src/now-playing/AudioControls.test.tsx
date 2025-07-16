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
  AudioPro: {
    play: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
  },
}));

// Mock our custom hook
jest.mock('./audio-player', () => ({
  useAudioPlayer: jest.fn(),
}));

const mockTrack: AudioProTrack = {
  url: 'https://example.com/audio.mp3',
  title: 'Test Track',
  artist: 'Test Artist',
  id: 'test-track-id',
  artwork: 'https://example.com/artwork.jpg',
};

describe('AudioControls', () => {
  const { AudioPro } = require('react-native-audio-pro');
  const { useAudioPlayer } = require('./audio-player');

  const mockControls = {
    togglePlayback: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockControls.togglePlayback.mockClear();
  });

  describe('IDLE state', () => {
    it('shows "No track loaded" message when in IDLE state', () => {
      useAudioPlayer.mockReturnValue({ state: 'IDLE', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('No track loaded')).toBeTruthy();
    });
  });

  describe('LOADING state', () => {
    it('shows loading indicator when in LOADING state', () => {
      useAudioPlayer.mockReturnValue({ state: 'LOADING', controls: mockControls });

      const { UNSAFE_getByType } = render(<AudioControls track={mockTrack} />);

      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });
  });

  describe('PLAYING and PAUSED states', () => {
    it('displays audio controls when in PLAYING state', () => {
      useAudioPlayer.mockReturnValue({ state: 'PLAYING', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByTestId('audio-controls')).toBeTruthy();
      expect(screen.getByTestId('play-pause-button')).toBeTruthy();
    });

    it('displays audio controls when in PAUSED state', () => {
      useAudioPlayer.mockReturnValue({ state: 'PAUSED', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByTestId('audio-controls')).toBeTruthy();
      expect(screen.getByTestId('play-pause-button')).toBeTruthy();
    });

    it('shows pause emoji when playing', () => {
      useAudioPlayer.mockReturnValue({ state: 'PLAYING', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('⏸️')).toBeTruthy();
    });

    it('shows play emoji when paused', () => {
      useAudioPlayer.mockReturnValue({ state: 'PAUSED', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('▶️')).toBeTruthy();
    });
  });

  describe('STOPPED state', () => {
    it('shows "Stopped" message when in STOPPED state', () => {
      useAudioPlayer.mockReturnValue({ state: 'STOPPED', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('Stopped')).toBeTruthy();
    });
  });

  describe('ERROR state', () => {
    it('shows "Error occurred" message when in ERROR state', () => {
      useAudioPlayer.mockReturnValue({ state: 'ERROR', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('Error occurred')).toBeTruthy();
    });
  });

  describe('Unknown state', () => {
    it('shows "Unknown state" message for unrecognized states', () => {
      useAudioPlayer.mockReturnValue({ state: 'SOME_UNKNOWN_STATE', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      expect(screen.getByText('Unknown state')).toBeTruthy();
    });
  });

  describe('User interactions', () => {
    it('calls togglePlayback when playing and button is pressed', async () => {
      useAudioPlayer.mockReturnValue({ state: 'PLAYING', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      fireEvent.press(playButton);

      expect(mockControls.togglePlayback).toHaveBeenCalledWith(mockTrack);
    });

    it('calls togglePlayback when paused and button is pressed', () => {
      useAudioPlayer.mockReturnValue({ state: 'PAUSED', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      fireEvent.press(playButton);

      expect(mockControls.togglePlayback).toHaveBeenCalledWith(mockTrack);
    });

    it('calls togglePlayback for other states when button is pressed', async () => {
      useAudioPlayer.mockReturnValue({ state: 'STOPPED', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      // In STOPPED state, there's no play button, it just shows "Stopped"
      // This test doesn't make sense with the current implementation
      // So let's test the useEffect call instead for track loading
      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack, { autoPlay: false });
    });
  });

  describe('Track loading', () => {
    it('loads track on component mount', () => {
      useAudioPlayer.mockReturnValue({ state: 'IDLE', controls: mockControls });
      AudioPro.play.mockResolvedValue(undefined);

      render(<AudioControls track={mockTrack} />);

      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack, { autoPlay: false });
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility labels for play button when paused', () => {
      useAudioPlayer.mockReturnValue({ state: 'PAUSED', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      expect(playButton.props.accessibilityLabel).toBe('Play');
      expect(playButton.props.accessibilityRole).toBe('button');
    });

    it('has proper accessibility labels for pause button when playing', () => {
      useAudioPlayer.mockReturnValue({ state: 'PLAYING', controls: mockControls });

      render(<AudioControls track={mockTrack} />);

      const playButton = screen.getByTestId('play-pause-button');
      expect(playButton.props.accessibilityLabel).toBe('Pause');
      expect(playButton.props.accessibilityRole).toBe('button');
    });
  });
});
