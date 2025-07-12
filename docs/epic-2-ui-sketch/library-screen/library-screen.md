# Library Screen

Displays a user's collection of audiobooks, allowing them to browse and select a book to listen to. This screen will serve as the entry point for users to access their content. It should provide a clear and organized view of available audiobooks, potentially with cover art, titles, and author information. Users should be able to easily navigate and select a book to begin playback.


## Taxonomy Systems

1.  **Standard Metadata:**
    *   **Title:** The official title of the audiobook.
    *   **Author:** The primary author(s) of the book.
    *   **Narrator:** The person(s) who narrated the audiobook.
    *   **Series:** If the book is part of a series, the series name and book number.
    *   **Genre/Category:** Broad classifications (e.g., Fantasy, Sci-Fi, Biography, Thriller). This will be crucial for filtering.
    *   **Publication Year:** The original publication year of the book.
    *   **Date Added:** The date the audiobook was added to the user's library.
    *   **Duration:** The total listening time of the audiobook.

2.  **User-Generated & Status Metadata:**
    *   **Tags/Labels:** User-definable keywords for personal organization (e.g., "Re-listen," "Road Trip," "Challenging," "Favorite").
    *   **Progress Status:** Indicates the user's listening progress: "Not Started," "In Progress," "Completed."
    *   **Favorites/Wishlist:** A flag or category for books the user particularly enjoys or intends to listen to.

3.  **Content-Based Metadata (for advanced chat functionality):**
    *   **Themes/Keywords:** Automatically extracted or manually assigned themes and keywords from the book's summary or content (e.g., "coming-of-age," "mystery," "space exploration," "historical fiction"). This will power more nuanced natural language queries.

## Library Display and Interaction

*   **Default View:** A visually appealing list layout displaying audiobook cover art. Each item should be visually striking and inviting, allowing each book to shine. Tapping a book in this view will take the user directly to the Now Playing screen.
*   **Alternative View:** An option to switch to a detailed list view, providing more detailed information at a glance (e.g., author, narrator(s), duration, progress, genre).
*   **Filtering & Sorting:** Prominent and intuitive controls for:
    *   **Filtering:** By Genre, Author, Narrator, Series, Progress Status, Tags.
    *   **Sorting:** By Title (A-Z/Z-A), Author (A-Z/Z-A), Recently Added, Duration, Progress.
*   **Universal Search Bar:** A highly visible search bar that allows users to search across all available metadata (Title, Author, Narrator, Genre, Tags, Themes/Keywords).
*   **"Chat with Library" Integration:** The search bar or a dedicated chat icon will initiate a natural language query interface. This feature will leverage the comprehensive taxonomy to answer user questions like:
    *   "Show me all my unread fantasy books."
    *   "What books do I have by Neil Gaiman?"
    *   "Find a book about ancient Rome."
    *   "Which books are less than 5 hours long?"

This combination of structured metadata and natural language processing will make the user's audiobook library highly discoverable and interactive.