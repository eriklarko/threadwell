import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { WhosHere } from './WhosHere.tsx';

const mockCharacters = [
  {
    id: 'alice',
    name: 'Alice',
  },
  {
    id: 'mad-hatter',
    name: 'Mad Hatter',
  },
  {
    id: 'march-hare',
    name: 'March Hare',
  },
  {
    id: 'dormouse',
    name: 'Dormouse',
  },
];

describe('WhosHere', () => {
  const mockOnCharacterPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all characters with names', () => {
    render(
      <WhosHere
        characters={mockCharacters}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    mockCharacters.forEach(character => {
      expect(screen.getByText(character.name)).toBeOnTheScreen();
    });
  });

  it('renders character avatars as touchable elements', () => {
    render(
      <WhosHere
        characters={mockCharacters}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    mockCharacters.forEach(character => {
      expect(screen.getByTestId(`character-avatar-${character.id}`)).toBeOnTheScreen();
    });
  });

  it('calls onCharacterPress when character is tapped', () => {
    render(
      <WhosHere
        characters={mockCharacters}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    const aliceAvatar = screen.getByTestId('character-avatar-alice');
    fireEvent.press(aliceAvatar);

    expect(mockOnCharacterPress).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('renders character list as horizontally scrollable', () => {
    render(
      <WhosHere
        characters={mockCharacters}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    const characterList = screen.getByTestId('character-list');
    expect(characterList).toBeOnTheScreen();
    expect(characterList.props.horizontal).toBe(true);
  });

  it('handles empty character list gracefully', () => {
    render(
      <WhosHere
        characters={[]}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    expect(screen.getByText('No characters in this scene')).toBeOnTheScreen();
  });

  it('displays character initials as fallback when no avatar is provided', () => {
    render(
      <WhosHere
        characters={mockCharacters}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    // Check that character initials are displayed
    expect(screen.getByText('A')).toBeOnTheScreen(); // Alice
    expect(screen.getAllByText('MH')[0]).toBeOnTheScreen(); // Mad Hatter
    expect(screen.getAllByText('MH')[1]).toBeOnTheScreen(); // March Hare (also "MH")
    expect(screen.getByText('D')).toBeOnTheScreen(); // Dormouse
  });

  it('renders component with correct test ID', () => {
    render(
      <WhosHere
        characters={mockCharacters}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    expect(screen.getByTestId('whos-here-pane')).toBeOnTheScreen();
  });  it('limits character names to 2 lines', () => {
    const longNameCharacter = {
      id: 'very-long-name-character',
      name: 'This is a very long character name that should wrap to multiple lines',
    };

    render(
      <WhosHere
        characters={[longNameCharacter]}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    // The character name Text component should have numberOfLines=2
    const characterNameText = screen.getByText(longNameCharacter.name);
    expect(characterNameText.props.numberOfLines).toBe(2);
  });

  it('displays character name when avatar is not provided', () => {
    const characterWithoutAvatar = {
      id: 'no-avatar',
      name: 'No Avatar Character',
    };

    render(
      <WhosHere
        characters={[characterWithoutAvatar]}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    expect(screen.getByText('No Avatar Character')).toBeOnTheScreen();
  });

  it('displays character name when avatar is provided', () => {
    const characterWithAvatar = {
      id: 'with-avatar',
      name: 'Avatar Character',
      avatar: 'path/to/avatar.jpg',
    };

    render(
      <WhosHere
        characters={[characterWithAvatar]}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    expect(screen.getByText('Avatar Character')).toBeOnTheScreen();
  });

  it('displays actual image when avatar is provided', () => {
    const characterWithAvatar = {
      id: 'with-avatar',
      name: 'Avatar Character',
      avatar: 'path/to/avatar.jpg',
    };

    render(
      <WhosHere
        characters={[characterWithAvatar]}
        onCharacterPress={mockOnCharacterPress}
      />
    );

    const avatarImage = screen.getByTestId('character-avatar-image-with-avatar');
    expect(avatarImage).toBeOnTheScreen();
    expect(avatarImage.props.source).toEqual({ uri: 'path/to/avatar.jpg' });
  });
});
