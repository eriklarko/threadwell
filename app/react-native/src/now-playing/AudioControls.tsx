import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { spacing, colors, typography } from '../design-system';
import { UseAudioPlayerReturn } from './useAudioPlayer';

interface AudioControlsProps {
  audioPlayer: UseAudioPlayerReturn;
}

/**
 * Basic audio controls component with play/pause functionality
 */
export function AudioControls({ audioPlayer }: AudioControlsProps) {
  const { state, controls } = audioPlayer;

  if (state.isLoading) {
    return (
      <View style={styles.container} testID="audio-controls-loading">
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Loading audio...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="audio-controls">
      <TouchableOpacity
        style={[styles.playButton, state.isPlaying && styles.playButtonActive]}
        onPress={controls.togglePlayback}
        testID="play-pause-button"
        accessibilityLabel={state.isPlaying ? 'Pause' : 'Play'}
        accessibilityRole="button"
      >
        <Text style={styles.playButtonText}>
          {state.isPlaying ? '⏸️' : '▶️'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
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
