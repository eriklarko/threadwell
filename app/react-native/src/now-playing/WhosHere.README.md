# WhosHere Component

The `WhosHere` component displays a pane showing characters present in the current scene of an audiobook. It provides an overview of the scene with character avatars and allows users to tap on characters to access their detailed dossiers.

## Features

- **Character Avatars**: Displays circular avatars for each character in the scene
- **Character Names**: Shows character names below their avatars
- **Horizontal Scrolling**: Character list scrolls horizontally for scenes with many characters
- **Tap to View Dossier**: Tapping a character calls the `onCharacterPress` callback
- **Empty State**: Gracefully handles scenes with no characters
- **Fallback Initials**: Shows character initials when no avatar image is provided

## Data Model

### Character
```typescript
interface Character {
  id: string;        // Unique identifier for the character
  name: string;      // Character's full name
  avatar?: string;   // Optional URL or path to avatar image
}
```

## Usage

```tsx
import { WhosHere } from './WhosHere';

const currentScene = {
  id: 'tea-party',
  description: "Alice is now in the Mad Hatter's tea party, where she encounters the Hatter, the March Hare, and the Dormouse.",
  characters: [
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
  ],
};

function MyComponent() {
  const handleCharacterPress = (character: Character) => {
    // Navigate to character dossier or show character details
    console.log('Selected character:', character.name);
  };

  return (
    <WhosHere
      scene={currentScene.characters}
      onCharacterPress={handleCharacterPress}
    />
  );
}
```

## Design

The component follows the design system conventions:
- Uses the app's color palette (dark theme with accent colors)
- Consistent spacing and typography
- Circular character avatars with accent background
- Responsive horizontal scrolling for character lists
- Clean, minimal interface with proper accessibility

## TODO

Improve scroll affordance
Add test that long names ellipse