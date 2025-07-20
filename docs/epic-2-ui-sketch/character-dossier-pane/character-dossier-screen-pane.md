# Character Dossier Pane - Sketch (Mobile App)

This sketch outlines the Character Dossier pane, which provides detailed information about a selected character from the audiobook.

## State 0: Default View

```
+-----------------------------------+
|                                   |
|  [Character Image/Avatar]         |
|                                   |
|  Character Name                   |
|  (Brief Description/Role)         |
|                                   |
|  -------------------------------  |
|                                   |
|  **History/Summary:**             |
|  (Scrollable text area with       |
|  detailed information about the   |
|  character's background and       |
|  actions within the story so far.)|
|                                   |
|  **Relationships:**               |
|  - Character A (Friend)           |
|  - Character B (Enemy)            |
|                                   |
+-----------------------------------+
```

### Elements:
*   **Character Image/Avatar:** A prominent image or avatar of the character.
*   **Character Name:** The full name of the character.
*   **Brief Description/Role:** A concise summary of the character's role or key characteristic.
*   **History/Summary:** A scrollable text area containing a detailed summary of the character's actions and history within the story, up to the current point in the audiobook (to avoid spoilers).
*   **Relationships:** A horizontal list of other characters and their relationship to the current character.

### Input data
```typescript
interface CharacterDossierProps {
  character: {
    name: string
    description: string
    avatar: string // URL or local asset identifier
    history: string
    relationships: {
      name: string
      relationship: string
    }[]
  }
}
```

### Data generation

Requirements:
* all data only depend on how much the user has read
** names can change (gandalf the grey vs white)
** descriptions change
** histories change
** relationships change
* fairly fast
* run on a backend somewhere

#### History

Focusing only on how to get the character history; a few paragraphs about the character and what they've done, or a bullet list of highlights.

Data we have:
 * The whole book text
 * A position where the user is

What we want
 * A description of what the character has done up to that point
