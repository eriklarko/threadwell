import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { spacing, colors, typography, borderRadius } from '../design-system';
import { useAudioPlayer, AudioTrack } from './useAudioPlayer';
import { AudioControls } from './AudioControls';

// Mock audio track data - will be replaced with real data later
const mockAudioTrack: AudioTrack = {
  id: 'alice-chapter-01',
  url: '../assets/audio/chapter-01.mp3', // Local audio file for testing
  title: "Alice's Adventures in Wonderland - Chapter 1",
  artist: 'Lewis Carroll',
  artwork: '../assets/images/alice-cover.jpg',
};

/**
 * Step 2: Basic audio player with play/pause functionality
 * Displays the essential book information and basic audio controls
 */
export function NowPlayingScreen() {
  const audioPlayer = useAudioPlayer(mockAudioTrack);
  return (
    <SafeAreaView style={styles.container} testID="now-playing-screen">
      <View style={styles.header} testID="now-playing-header">
        {/* Header will have back button and settings in future steps */}
      </View>

      <View style={styles.content} testID="now-playing-content">
        <Image
          source={require('../assets/images/alice-cover.jpg')}
          style={styles.coverArt}
          testID="book-cover"
          resizeMode="contain"
        />

        <Text style={styles.bookTitle} testID="book-title">
          Alice's Adventures in Wonderland
        </Text>

        <Text style={styles.authorName} testID="book-author">
          Lewis Carroll
        </Text>

        <AudioControls audioPlayer={audioPlayer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 60,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  coverArt: {
    width: 200,
    height: 280,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  bookTitle: {
    fontSize: typography.sizes.heading,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  authorName: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});