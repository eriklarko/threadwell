import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAudioPlayer, AudioTrack } from './useAudioPlayer';

// Mock audio track for testing
const mockTrack: AudioTrack = {
  id: 'test-track',
  url: 'test-audio.mp3',
  title: 'Test Track',
  artist: 'Test Artist',
  artwork: 'test-artwork.jpg',
};

describe('useAudioPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear any existing timers
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('starts in loading state', () => {
    const { result } = renderHook(() => useAudioPlayer(mockTrack));

    expect(result.current.state.isLoading).toBe(true);
    expect(result.current.state.isPlaying).toBe(false);
    expect(result.current.state.duration).toBe(0);
    expect(result.current.state.position).toBe(0);
  });

  it('completes loading after timeout', async () => {
    const { result } = renderHook(() => useAudioPlayer(mockTrack));

    expect(result.current.state.isLoading).toBe(true);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });

    expect(result.current.state.duration).toBe(300);
  });

  describe('Playback controls', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it('play() sets isPlaying to true and logs message', async () => {
      const { result } = renderHook(() => useAudioPlayer(mockTrack));

      // Wait for loading to complete
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.state.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.controls.play();
      });

      expect(result.current.state.isPlaying).toBe(true);
      expect(consoleLogSpy).toHaveBeenCalledWith('Mock: Playing audio track:', mockTrack.title);
    });

    it('pause() sets isPlaying to false and logs message', async () => {
      const { result } = renderHook(() => useAudioPlayer(mockTrack));

      // Wait for loading to complete
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.state.isLoading).toBe(false);
      });

      // First play
      await act(async () => {
        await result.current.controls.play();
      });

      // Then pause
      await act(async () => {
        await result.current.controls.pause();
      });

      expect(result.current.state.isPlaying).toBe(false);
      expect(consoleLogSpy).toHaveBeenCalledWith('Mock: Pausing audio track:', mockTrack.title);
    });

    it('togglePlayback() switches between play and pause', async () => {
      const { result } = renderHook(() => useAudioPlayer(mockTrack));

      // Wait for loading to complete
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.state.isLoading).toBe(false);
      });

      expect(result.current.state.isPlaying).toBe(false);

      // Toggle to play
      await act(async () => {
        await result.current.controls.togglePlayback();
      });

      expect(result.current.state.isPlaying).toBe(true);

      // Toggle to pause
      await act(async () => {
        await result.current.controls.togglePlayback();
      });

      expect(result.current.state.isPlaying).toBe(false);
    });

    it('seekTo() updates position and logs message', async () => {
      const { result } = renderHook(() => useAudioPlayer(mockTrack));

      // Wait for loading to complete
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.state.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.controls.seekTo(150);
      });

      expect(result.current.state.position).toBe(150);
      expect(consoleLogSpy).toHaveBeenCalledWith('Mock: Seeking to position:', 150);
    });
  });

  describe('Track changes', () => {
    it('resets state when track changes', async () => {
      const { result, rerender } = renderHook(
        ({ track }) => useAudioPlayer(track),
        { initialProps: { track: mockTrack } }
      );

      // Wait for initial loading
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.state.isLoading).toBe(false);
      });

      // Play the track
      await act(async () => {
        await result.current.controls.play();
      });

      expect(result.current.state.isPlaying).toBe(true);

      // Change track
      const newTrack: AudioTrack = {
        ...mockTrack,
        id: 'new-track',
        title: 'New Track',
      };

      rerender({ track: newTrack });

      // Should reset to loading state
      expect(result.current.state.isLoading).toBe(true);
      expect(result.current.state.isPlaying).toBe(false);
    });
  });
});
