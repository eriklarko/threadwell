# Library Screen - Search Functionality Sketch (Mobile App)

This sketch illustrates the interaction flow for the search bar, including the transition to a chat-based search mode.

## State 0: Library screen

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
|  (Rest of the list view)          |
|                                   |
+-----------------------------------+
```

## State 1: Initial Search (Keyboard Popped Up)

When the user taps the search icon, the keyboard appears, and the search bar is ready for text input, replacing the header content. The icon changes to a chat icon, that leads the user to the chat experience.

Note: TW is a small version of the Threadwell logo

```
+-----------------------------------+
| [TW] [ <cursor>            [💬] ] |
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
|  (Rest of the list view)          |
|                                   |
|  (Keyboard appears here)          |
|                                   |
+-----------------------------------+
```

## State 2: Entering Chat Mode (Option 1: Tapping Chat Icon)

If the user taps the search icon (which changes to a chat bubble) while the search bar is actived, the search bar transitions to a chat input field, above the library view, but not covering it.

The chat is a regular LLM chat interface you can use to refine the results by asking questions like
  * Show me books with strong female protagonists
  * only include books that solve conflicts without violence

Tapping the x takes the user back to State 0.

```
+-----------------------------------+
| [TW] +--------------------------+ |
|      |                          | |
|      |                          | |
|      | chat mode            [x] | |
|      +--------------------------+ |
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
|  (Rest of the list view)          |
|                                   |
|  (Keyboard appears here)          |
|                                   |
+-----------------------------------+
```

## State 3: Entering Chat Mode (Option 2: Tapping Search Bar After Initial Search)

After an initial search has been performed and results are displayed, if the user taps the search bar again, it automatically enters chat mode. An 'X' icon appears to clear the input and revert to normal search.

Here the user has searched for Lewis Carrol. The search icon is now a chat icon, and when tapped takes the user to State 2 where they can refine their search - or exit out of it

```
+-----------------------------------+
| [TW] [ Lewis Carrol        [💬] ] |
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
|  (Rest of the list view)          |
|                                   |
|  (Keyboard appears here)          |
|                                   |
+-----------------------------------+
```
