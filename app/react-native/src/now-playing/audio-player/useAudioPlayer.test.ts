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
    seekForward: jest.fn(),
    seekBack: jest.fn(),
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
    useAudioPro.mockReturnValue({
      state: AudioProState.PLAYING,
      position: 30000,
      duration: 180000
    });

    const { result } = renderHook(() => useAudioPlayer());

    expect(result.current.state).toBe(AudioProState.PLAYING);
    expect(result.current.position).toBe(30000);
    expect(result.current.duration).toBe(180000);
  });

  describe('togglePlayback control', () => {
    it('pauses when playing', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PLAYING, position: 0, duration: 0 });
      AudioPro.pause.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.pause).toHaveBeenCalled();
    });

    it('resumes when paused', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PAUSED, position: 0, duration: 0 });

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.resume).toHaveBeenCalled();
    });

    it('plays when not playing or paused', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.IDLE, position: 0, duration: 0 });
      AudioPro.play.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack);
    });

    it('plays when stopped', async () => {
      useAudioPro.mockReturnValue({ state: AudioProState.STOPPED, position: 0, duration: 0 });
      AudioPro.play.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAudioPlayer());

      await act(async () => {
        await result.current.controls.togglePlayback(mockTrack);
      });

      expect(AudioPro.play).toHaveBeenCalledWith(mockTrack);
    });
  });

  describe('skipForward control', () => {
    it('calls AudioPro.seekForward with default 5 seconds when no parameter provided', () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PLAYING });

      const { result } = renderHook(() => useAudioPlayer());

      act(() => {
        result.current.controls.skipForward();
      });

      expect(AudioPro.seekForward).toHaveBeenCalledWith(5000); // 5 seconds in milliseconds
    });

    it('calls AudioPro.seekForward with custom seconds converted to milliseconds', () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PLAYING });

      const { result } = renderHook(() => useAudioPlayer());

      act(() => {
        result.current.controls.skipForward(10);
      });

      expect(AudioPro.seekForward).toHaveBeenCalledWith(10000); // 10 seconds in milliseconds
    });
  });

  describe('skipBack control', () => {
    it('calls AudioPro.seekBack with default 5 seconds when no parameter provided', () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PLAYING });

      const { result } = renderHook(() => useAudioPlayer());

      act(() => {
        result.current.controls.skipBack();
      });

      expect(AudioPro.seekBack).toHaveBeenCalledWith(5000); // 5 seconds in milliseconds
    });

    it('calls AudioPro.seekBack with custom seconds converted to milliseconds', () => {
      useAudioPro.mockReturnValue({ state: AudioProState.PLAYING });

      const { result } = renderHook(() => useAudioPlayer());

      act(() => {
        result.current.controls.skipBack(15);
      });

      expect(AudioPro.seekBack).toHaveBeenCalledWith(15000); // 15 seconds in milliseconds
    });
  });
});
