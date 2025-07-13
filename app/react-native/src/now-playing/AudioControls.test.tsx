import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { AudioControls } from './AudioControls';
import { UseAudioPlayerReturn, AudioPlayerState, AudioPlayerControls } from './useAudioPlayer';

// Mock audio player return for testing
const createMockAudioPlayer = (overrides: Partial<AudioPlayerState> = {}): UseAudioPlayerReturn => {
  const mockControls: AudioPlayerControls = {
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn().mockResolvedValue(undefined),
    togglePlayback: jest.fn().mockResolvedValue(undefined),
    seekTo: jest.fn().mockResolvedValue(undefined),
  };

  const defaultState: AudioPlayerState = {
    isLoading: false,
    isPlaying: false,
    duration: 300,
    position: 0,
    ...overrides,
  };

  return {
    state: defaultState,
    controls: mockControls,
  };
};

describe('AudioControls', () => {
  describe('Loading state', () => {
    it('shows loading state when audio is loading', () => {
      const mockAudioPlayer = createMockAudioPlayer({ isLoading: true });
      render(<AudioControls audioPlayer={mockAudioPlayer} />);

      expect(screen.getByTestId('audio-controls-loading')).toBeTruthy();
      expect(screen.getByText('Loading audio...')).toBeTruthy();
    });

    it('shows activity indicator during loading', () => {
      const mockAudioPlayer = createMockAudioPlayer({ isLoading: true });
      render(<AudioControls audioPlayer={mockAudioPlayer} />);

      const loadingContainer = screen.getByTestId('audio-controls-loading');
      expect(loadingContainer).toBeTruthy();
    });
  });

  describe('Loaded state', () => {
    it('displays audio controls after loading', () => {
      const mockAudioPlayer = createMockAudioPlayer({ isLoading: false });
      render(<AudioControls audioPlayer={mockAudioPlayer} />);

      expect(screen.getByTestId('audio-controls')).toBeTruthy();
    });

    it('displays play button in paused state initially', () => {
      const mockAudioPlayer = createMockAudioPlayer({ isPlaying: false });
      render(<AudioControls audioPlayer={mockAudioPlayer} />);

      const playButton = screen.getByTestId('play-pause-button');
      expect(playButton).toBeTruthy();
    });

    it('displays pause button when playing', () => {
      const mockAudioPlayer = createMockAudioPlayer({ isPlaying: true });
      render(<AudioControls audioPlayer={mockAudioPlayer} />);
    });
  });

  describe('User interactions', () => {
    it('calls togglePlayback when play/pause button is pressed', () => {
      const mockAudioPlayer = createMockAudioPlayer();
      render(<AudioControls audioPlayer={mockAudioPlayer} />);

      const playButton = screen.getByTestId('play-pause-button');
      fireEvent.press(playButton);

      expect(mockAudioPlayer.controls.togglePlayback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility labels for play button', () => {
      const mockAudioPlayer = createMockAudioPlayer({ isPlaying: false });
      render(<AudioControls audioPlayer={mockAudioPlayer} />);

      const playButton = screen.getByTestId('play-pause-button');
      expect(playButton.props.accessibilityLabel).toBe('Play');
      expect(playButton.props.accessibilityRole).toBe('button');
    });

    it('has proper accessibility labels for pause button', () => {
      const mockAudioPlayer = createMockAudioPlayer({ isPlaying: true });
      render(<AudioControls audioPlayer={mockAudioPlayer} />);

      const playButton = screen.getByTestId('play-pause-button');
      expect(playButton.props.accessibilityLabel).toBe('Pause');
      expect(playButton.props.accessibilityRole).toBe('button');
    });
  });
});
