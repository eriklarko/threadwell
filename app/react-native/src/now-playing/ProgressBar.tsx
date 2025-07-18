import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, colors, typography } from '../design-system';

interface ProgressBarProps {
  position: number; // Current position in milliseconds
  duration: number; // Total duration in milliseconds
}

/**
 * Formats time from milliseconds to MM:SS format
 */
function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Read-only progress bar component showing audio playback progress
 */
export function ProgressBar({ position, duration }: ProgressBarProps) {
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;
  const clampedPercentage = Math.min(100, Math.max(0, progressPercentage));

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(position)}</Text>

      <View
        style={styles.progressBarContainer}
        testID="progress-bar"
        accessibilityLabel={`Audio progress: ${Math.round(clampedPercentage)}% complete`}
        accessibilityRole="progressbar"
      >
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${clampedPercentage}%` }]}
            testID="progress-fill"
          />
        </View>
      </View>

      <Text style={styles.timeText}>{formatTime(duration)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  timeText: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    fontWeight: typography.weights.medium,
    width: 50,
    textAlign: 'center',
  },
  progressBarContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
});
