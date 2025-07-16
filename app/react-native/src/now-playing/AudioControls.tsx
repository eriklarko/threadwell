import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { spacing, colors, typography } from '../design-system';
// TODO: Ports and adapters please :cry:
import { AudioProState, AudioProTrack } from 'react-native-audio-pro';
import { AudioPro } from 'react-native-audio-pro';
import { useAudioPlayer } from './audio-player';

interface AudioControlsProps {
  track: AudioProTrack;
}

/**
 * Basic audio controls component with play/pause functionality
 */
export function AudioControls({ track }: AudioControlsProps) {

  useEffect(() => {
    // Ensure the track is loaded when the component mounts
    AudioPro.play(track, { autoPlay: false });
  }, [track]);

  const { state, controls } = useAudioPlayer();

  switch (state) {
    case AudioProState.IDLE:
      return <Text style={styles.statusText}>No track loaded</Text>;
    case AudioProState.LOADING:
      return <ActivityIndicator size="large" color={colors.surface} style={styles.loadingText} />;
    case AudioProState.PLAYING:
    case AudioProState.PAUSED:
      const isPlaying = state === AudioProState.PLAYING;
      return (
        <View style={styles.container} testID="audio-controls">
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => controls.skipBack(5)}
              testID="skip-back-button"
              accessibilityLabel="Skip back 5 seconds"
              accessibilityRole="button"
            >
              <Text style={styles.skipButtonText}>⏪ 5s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.playButton, isPlaying && styles.playButtonActive]}
              onPress={() => controls.togglePlayback(track)}
              testID="play-pause-button"
              accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
              accessibilityRole="button"
            >
              <Text style={styles.playButtonText}>
                {isPlaying ? '⏸️' : '▶️'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => controls.skipForward(5)}
              testID="skip-forward-button"
              accessibilityLabel="Skip forward 5 seconds"
              accessibilityRole="button"
            >
              <Text style={styles.skipButtonText}>5s ⏩</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case AudioProState.STOPPED:
      return <Text style={styles.statusText}>Stopped</Text>;
    case AudioProState.ERROR:
      return <Text style={styles.statusText}>Error occurred</Text>;
    default:
      return <Text style={styles.statusText}>Unknown state</Text>;
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  playButton: {
    // TODO: Use design system for button styles
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  playButtonActive: {
    backgroundColor: colors.accent,
  },
  playButtonText: {
    fontSize: 32,
  },
  skipButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.text.secondary,
  },
  skipButtonText: {
    fontSize: typography.sizes.small,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },
  statusText: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    fontWeight: typography.weights.medium,
  },
  loadingText: {
    fontSize: typography.sizes.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});
