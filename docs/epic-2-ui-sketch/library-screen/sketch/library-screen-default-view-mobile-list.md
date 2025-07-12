# Library Screen - Default View Sketch (Mobile App - List Layout)

## Layout: List View

A visually appealing list layout, optimized for displaying audiobook cover art and key information on a mobile screen. Each item is designed to be visually striking and inviting.

### Header (Top of Screen):
*   **App Title/Logo:** "Threadwell" or similar, prominently displayed on the left.
*   **Search Icon:** A magnifying glass icon on the right, tapping it expands to a full-width search bar, with ability to expand to a chat interface

### Main Content Area:
*   **Scrollable List of Audiobook Items:**
    *   Each item represents an audiobook, taking up the full width of the screen.
    *   **Cover Art:** Prominent display of the audiobook's cover art on the left side of the list item.
    *   **Title:** On top of the cover art, bottom right corner, the audiobook's title (e.g., "Alice in Wonderland"), in a clear, readable font.
    *   **Author:** On top of the cover art, top left corner, the author's name (e.g., "Lewis Carroll"), in a slightly smaller font.
    *   **Progress Indicator (Optional):** A subtle progress bar or text indicating listening progress if applicable. something on top of the cover art
    *   **output from excerpt service**: A paragraph of text pulling the reader back into the book. Or perhaps just the last bit of text to start hehe :)

### Example Mobile List (Conceptual):

```
+-----------------------------------+
| Threadwell                   [🔍] |
+-----------------------------------+
|                                   |
|  +----------+                     |
|  | author   |  output from        |
|  |  cover   |  excerpt service    |
|  |  art     |  last time on ...   |
|  |   title  |   boom! pang!       |
|  | progress |                     |
|  +----------+                     |
|                                   |
|  +----------+                     |
|  | author   |  output from        |
|  |  cover   |  excerpt service    |
|  |  art     |  last time on ...   |
|  | title    |   boom! pang!       |
|  | progress |                     |
|  +----------+                     |
|                                   |
|  +----------+                     |
|  | author   |  output from        |
|  |  cover   |  excerpt service    |
|  |  art     |  last time on ...   |
|  | title    |   boom! pang!       |
|  | progress |                     |
|  +----------+                     |
|                                   |
|  (Scrollable area for more books) |
|                                   |
+-----------------------------------+
```
