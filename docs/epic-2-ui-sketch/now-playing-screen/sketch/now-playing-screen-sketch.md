# Now Playing Screen - Sketch (Mobile App)

This sketch illustrates the primary interface for audiobook playback, focusing on a more engaging visual layout and integrating smart controls.

## State 0: Default Now Playing View

```
+-----------------------------------+
| < Back                       [⚙️] |
+-----------------------------------+
|                                   |
|        +-----------------+        |
|        |                 |        |
|        |  Book Cover Art |        |
|        |                 |        |
|        +-----------------+        |
|                                   |
|        Title of Audiobook         |
|        Author Name                |
|                                   |
|  -------------------------------  |
|        Chapter Title              |
|  -------------------------------  |
|                                   |
|         [Progress Bar]            |
|      00:00:00 / 00:00:00          |
|                                   |
|  +-----------------------------+  |
|  | [Smart Rwnd] [⏯] [Smart Fwd]  |
|  +-----------------------------+  |
|                                   |
|  [Who's Here? (Dossier)]   [💬]   |
|                                   |
+-----------------------------------+
```

### Elements:
*   **Back Button:** Top left, to return to the library.
*   **Settings Icon:** Top right, for playback settings or general app settings.
*   **Book Cover Art:** Prominently displayed and centered.
*   **Title of Audiobook:** Centered below cover art, in a clear and prominent font.
*   **Author Name:** Centered below title.
*   **Chapter Title:** Centered, with visual separators.
*   **Progress Bar:** Visual representation of listening progress.
*   **Time Display:** Current time and total duration.
*   **Playback Controls:** Grouped centrally.
    *   **Smart Rewind:** Jumps back to the beginning of the last paragraph.
    *   **Play/Pause (⏯):** Toggle playback.
    *   **Smart Fwd:** Jumps forward to the beginning of the next paragraph/sentence.
*   **Who's Here? (Dossier) Button:** Opens an overlay/section showing characters in the current scene. The Character Dossier will be accessible from within this view.
*   **Ask Me Anything (Chat Icon) Button:** Opens the interactive chat interface.

## State 1: Chat Interface Open

When the user taps the "Ask Me Anything" chat icon, a chat overlay appears, similar to the search chat, allowing natural language queries about the book.

```
+-----------------------------------+
| < Back                       [⚙️] |
+-----------------------------------+
|                                   |
|        +-----------------+        |
|        |                 |        |
|        |  Book Cover Art |        |
|        |                 |        |
|        +-----------------+        |
|                                   |
|        Title of Audiobook         |
|                                   |
+-----------------------------------+
|  +--------------------------+     |
|  |                          |     |
|  |                          |     |
|  +--------------------------+     |
|                                   |
|  +--------------------------+     |
|  |                          |     |
|  +--------------------------+     |
|                                   |
|  +--------------------------+     |
|  |                          |     |
|  |                          |     |
|  | <cursor>             [x] |     |
|  +--------------------------+     |
|                                   |
+-----------------------------------+
```

### Elements:
*   **Chat Overlay:** Appears above the main playback controls.
*   **Chat Input Field:** For typing questions.
*   **Chat Conversation Area:** Displays the chat history and responses.
*   **Close Button (x):** To close the chat overlay and return to the default Now Playing view.
