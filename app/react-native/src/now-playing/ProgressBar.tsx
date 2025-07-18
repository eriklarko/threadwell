import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, colors, typography, borderRadius } from '../design-system';

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
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressTrack: {
    height: spacing.xs,
    backgroundColor: colors.surface,
    overflow: 'hidden',

    marginHorizontal: spacing.sm,

    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: borderRadius.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: borderRadius.sm,
  },
});
