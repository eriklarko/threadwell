import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { spacing, colors, typography, borderRadius, gridSize } from '../design-system';
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
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => console.log('Chat button pressed')}
          testID="chat-button"
        >
          <Text style={styles.chatButtonText}>💬</Text>
        </TouchableOpacity>
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
    height: gridSize * 7.5, // 60px based on gridSize
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: gridSize * 6,
    height: gridSize * 6,
    borderRadius: gridSize * 3,
    backgroundColor: colors.text.primary,
  },
  chatButtonText: {
    fontSize: typography.sizes.large,
    color: colors.background,
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
    width: gridSize * 25, // 200px based on gridSize
    height: gridSize * 35, // 280px based on gridSize
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