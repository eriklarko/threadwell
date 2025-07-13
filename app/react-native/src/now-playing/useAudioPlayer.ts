import { useState, useEffect } from 'react';

export interface AudioTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork?: string;
}

export interface AudioPlayerState {
  isLoading: boolean;
  isPlaying: boolean;
  duration: number;
  position: number;
}

export interface AudioPlayerControls {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  togglePlayback: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
}

export interface UseAudioPlayerReturn {
  state: AudioPlayerState;
  controls: AudioPlayerControls;
}

/**
 * Custom hook for audio playback using react-native-track-player
 *
 * NOTE: This is a mock implementation until react-native-track-player is installed.
 * The real implementation will use TrackPlayer from 'react-native-track-player'.
 */
export function useAudioPlayer(track: AudioTrack): UseAudioPlayerReturn {
  const [state, setState] = useState<AudioPlayerState>({
    isLoading: true,
    isPlaying: false,
    duration: 0,
    position: 0,
  });

  useEffect(() => {
    // Reset to loading state when track changes
    setState({
      isLoading: true,
      isPlaying: false,
      duration: 0,
      position: 0,
    });

    // Mock loading complete after a short delay
    const timer = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        duration: 300, // Mock 5 minutes duration
      }));
    }, 100); // Reduced from 1000ms to 100ms for faster tests

    return () => clearTimeout(timer);
  }, [track]);

  const play = async () => {
    console.log('Mock: Playing audio track:', track.title);
    setState(prev => ({ ...prev, isPlaying: true }));
  };

  const pause = async () => {
    console.log('Mock: Pausing audio track:', track.title);
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const togglePlayback = async () => {
    if (state.isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  const seekTo = async (position: number) => {
    console.log('Mock: Seeking to position:', position);
    setState(prev => ({ ...prev, position }));
  };

  return {
    state,
    controls: {
      play,
      pause,
      togglePlayback,
      seekTo,
    },
  };
}
