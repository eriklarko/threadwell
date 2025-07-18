import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { spacing, colors, typography, borderRadius } from '../design-system';

export interface Character {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface WhosHereProps {
  characters: Character[];
  onCharacterPress: (character: Character) => void;
}

/**
 * Gets the initials for a character name
 * @param name - The character's full name
 * @returns The character's initials (up to 2 characters)
 */
function getCharacterInitials(name: string): string {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
}

/**
 * Who's Here pane component showing characters in the current scene
 */
export function WhosHere({ characters, onCharacterPress }: WhosHereProps) {
  return (
    <View style={styles.container} testID="whos-here-pane">
    {characters.length > 0 ? (
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.characterListContainer}
        contentContainerStyle={styles.characterListContent}
        testID="character-list"
        >
        {characters.map((character) => (
            <TouchableOpacity
            key={character.id}
            style={styles.characterItem}
            onPress={() => onCharacterPress(character)}
            testID={`character-avatar-${character.id}`}
            >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                {getCharacterInitials(character.name)}
                </Text>
            </View>
            <Text numberOfLines={2} style={styles.characterName}>{character.name}</Text>
            </TouchableOpacity>
        ))}
        </ScrollView>
    ) : (
        <Text style={styles.emptyMessage}>No characters in this scene</Text>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: borderRadius.lg,
    margin: spacing.md,

    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  characterListContainer: {
    flexGrow: 0,
  },
  characterListContent: {
    paddingHorizontal: spacing.xs,
  },
  characterItem: {
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    width: 80,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.background,
  },
  characterName: {
    color: colors.text.primary,
    fontSize: typography.sizes.small,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  emptyMessage: {
    color: colors.text.secondary,
    fontSize: typography.sizes.body,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
