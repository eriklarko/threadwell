# Who's Here? Pane - Sketch (Mobile App)

This sketch illustrates the layout for the 'Who's Here?' pane, which provides a quick overview of characters in the current scene and contextual information.

## State 0: Default View

```
+-----------------------------------+
|                                   |
|  [Description of Current Scene]   |
|  (e.g., "Alice is now in the      |
|  Mad Hatter's tea party, where    |
|  she encounters the Hatter, the   |
|  March Hare, and the Dormouse.")  |
|                                   |
|  -------------------------------  |
|                                   |
|  [Character Avatars (Horizontal Scroll)]
|                                   |
|  +-----+  +-----+  +-----+  +-----+
|  |  O  |  |  O  |  |  O  |  |  O  |
|  |     |  |     |  |     |  |     |
|  +-----+  +-----+  +-----+  +-----+
|   Alice    Hatter   M. Hare  Dormouse
+-----------------------------------+
```

### Elements:
*   **Close Button (X):** Top right, to close the pane.
*   **Description of Current Scene:** A text area providing a brief summary of what is currently happening in the audiobook, setting the context for the characters present.
*   **Character Avatars (Horizontal Scroll):** A horizontally scrollable list of circular avatars, each representing a character in the current scene. Below each avatar is the character's name.
*   **Tap Character for Dossier:** A hint indicating that tapping an avatar will open the Character Dossier.
