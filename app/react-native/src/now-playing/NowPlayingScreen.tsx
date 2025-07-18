import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { spacing, colors, typography, borderRadius } from '../design-system';
import { AudioControls } from './audio-player/AudioControls';
import { WhosHere } from './WhosHere';
import { Spacer } from '../design-system/Spacer';

// Mock scene data - in a real app this would come from props or state
const scene = {
  description: "Alice finds herself in a whimsical tea party with the Mad Hatter, March Hare, and Dormouse. The table is set with mismatched cups and saucers, and the conversation flows as peculiarly as the tea itself. Everyone seems to be talking in riddles and nonsense, making Alice feel quite bewildered by the strange etiquette of this endless tea party.",
  characters: [{
    id: 'alice',
    name: 'Alice',
  },{
    id: 'mad-hatter',
    name: 'Mad Hatter',
  }, {
    id: 'march-hare',
    name: 'March Hare of ridiculous doom',
  }, {
    id: 'dormouse',
    name: 'Dormouse',
    avatar: 'https://picsum.photos/200',
  }],
};

export function NowPlayingScreen() {
  return (
    <SafeAreaView style={styles.container} testID="now-playing-screen">
      <View style={styles.header} testID="now-playing-header">
        {/* Header will have back button and settings in future steps */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        testID="now-playing-scroll"
      >
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

          <AudioControls track={{
            id: 'alice-chapter-01',
            //url: '../assets/audio/chapter-01.mp3', // Local audio file for testing
            url: 'https://rnap.dev/audio-soundhelix-song-1-tschurger.mp3',
            title: "Alice's Adventures in Wonderland - Chapter 1",
            artist: 'Lewis Carroll',
            artwork: '../assets/images/alice-cover.jpg',
          }}/>

          <Spacer />

          <Text style={styles.sceneDescription} testID="scene-description">
            {scene.description}
          </Text>

          <WhosHere
            characters={scene.characters}
            onCharacterPress={(c) => console.log(`Character pressed`, c)}
          />
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    minWidth: '100%',
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
  sceneDescription: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.normal,
    color: colors.text.primary,
    textAlign: 'left',
    lineHeight: typography.sizes.body * 1.5,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
});