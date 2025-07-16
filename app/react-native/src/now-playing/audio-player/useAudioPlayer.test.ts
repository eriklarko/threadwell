import { renderHook, act } from '@testing-library/react-native';
import { useAudioPlayer } from './index';
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

describe('useAudioPlayer', () => {
  const { useAudioPro, AudioPro } = require('react-native-audio-pro');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns state from useAudioPro', () => {
    useAudioPro.mockReturnValue({ state: AudioProState.PLAYING });

    const { result } = renderHook(() => useAudioPlayer());

    expect(result.current.state).toBe(AudioProState.PLAYING);
  });

  describe('togglePlayback control', () => {
    it('pauses when playing', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PLAYING });
      AudioPro.pause.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.pause).toHaveBeenCalled();
    });

    it('resumes when paused', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PAUSED });

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.resume).toHaveBeenCalled();
    });

    it('plays when not playing or paused', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.IDLE });
      AudioPro.play.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack);
    });

    it('plays when stopped', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.STOPPED });
      AudioPro.play.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack);
    });
  });
});
