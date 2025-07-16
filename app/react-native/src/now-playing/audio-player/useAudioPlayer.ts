import { useMemo } from 'react';
import { AudioProState, AudioProTrack, useAudioPro } from 'react-native-audio-pro';
import { AudioPro } from 'react-native-audio-pro';

export interface AudioPlayerControls {
  togglePlayback: (track: AudioProTrack) => Promise<void>;
  skipForward: (seconds?: number) => void;
  skipBack: (seconds?: number) => void;
}

export interface UseAudioPlayerReturn {
  state: AudioProState;
  controls: AudioPlayerControls;
}

/**
 * Custom hook that wraps useAudioPro and provides additional audio controls
 */
export function useAudioPlayer(): UseAudioPlayerReturn {
  const audioPro = useAudioPro();

  const controls = useMemo(() => ({
    togglePlayback: async (track: AudioProTrack) => {
      if (audioPro.state === AudioProState.PLAYING) {
        await AudioPro.pause();
      } else if (audioPro.state === AudioProState.PAUSED) {
        // If paused and we don't need to load a new track, resume
        AudioPro.resume();
      } else {
        await AudioPro.play(track);
      }
    },
    skipForward: (seconds: number = 5) => {
      AudioPro.seekForward(seconds * 1000); // Convert seconds to milliseconds
    },
    skipBack: (seconds: number = 5) => {
      AudioPro.seekBack(seconds * 1000); // Convert seconds to milliseconds
    }
  }), [audioPro.state]);

  return {
    ...audioPro,
    controls
  };
}
