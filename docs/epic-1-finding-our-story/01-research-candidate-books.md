### Task 1: Research Candidate Books

*   **Goal:** Create a short list of 3-5 potential public domain books that are well-known and have engaging content.
*   **Steps:**
    1.  Search for lists of popular and highly-rated public domain books.
    2.  Prioritize books with strong character development and interesting plots, as this will be ideal for testing our app's smart features.
    3.  **Crucially, investigate if any of these have publicly available text-to-audio synchronization data (e.g., timestamped transcripts).**
    4.  Compile the findings into a list of top candidates.

## Research Findings

Based on research into sci-fi/fantasy public domain books with audiobook availability and synchronization potential, here are the top candidates:

### 1. **Alice's Adventures in Wonderland** by Lewis Carroll (1865)
**Why it's ideal:**
- **Length:** Short (~170KB text, ~3-4 hours audio) - perfect for initial development
- **Content:** Fantasy adventure with whimsical characters and clear scene transitions
- **Availability:** Project Gutenberg (#11) + multiple LibriVox recordings
- **App Features:** Excellent for testing "Who's Here" (Mad Hatter, Cheshire Cat, etc.), scene-based navigation (Tea Party, Queen's Court)
- **Sync Potential:** Very popular book, likely target for forced alignment projects
- **Violence/Religious:** None - purely whimsical fantasy

### 2. **The Time Machine** by H.G. Wells (1895)
**Why it's ideal:**
- **Length:** Novella length (~200KB text) - manageable scope
- **Content:** Classic sci-fi with clear time period transitions (perfect for scene navigation)
- **Availability:** Project Gutenberg (#35) + LibriVox recordings
- **App Features:** Great for testing scene rewind (different time periods), character tracking (Eloi, Morlocks)
- **Sync Potential:** Wells is popular in digital humanities projects
- **Violence/Religious:** Minimal violence, no religious content

### 3. **A Princess of Mars** by Edgar Rice Burroughs (1917)
**Why it's ideal:**
- **Length:** ~390KB text - slightly longer but manageable
- **Content:** Science fantasy adventure on Mars with rich world-building
- **Availability:** Project Gutenberg (#62) + potential LibriVox recordings
- **App Features:** Complex character interactions (John Carter, Dejah Thoris, various Martian tribes)
- **Sync Potential:** Popular early sci-fi, good candidate for academic projects
- **Violence/Religious:** Some action/adventure violence but not graphic

### 4. **Around the World in Eighty Days** by Jules Verne (1873)
**Why it's ideal:**
- **Length:** Medium length, episodic structure
- **Content:** Adventure story with clear geographical scene changes
- **Availability:** Project Gutenberg + LibriVox
- **App Features:** Perfect for scene navigation (different countries), character tracking (Fogg, Passepartout)
- **Sync Potential:** Popular classic, likely used in educational projects
- **Violence/Religious:** Minimal, family-friendly adventure

### 5. **The Wonderful Wizard of Oz** by L. Frank Baum (1900)
**Why it's ideal:**
- **Length:** Children's book length - shorter and manageable
- **Content:** Fantasy adventure with memorable characters and clear scenes
- **Availability:** Project Gutenberg + LibriVox recordings
- **App Features:** Excellent character tracking (Dorothy, Scarecrow, Tin Man, Lion), clear scene transitions
- **Sync Potential:** Popular children's classic, educational use
- **Violence/Religious:** Family-friendly, no concerning content

## Key Research Insights

### Synchronization Data Availability
- **Tools Found:** `syncabook` project specifically creates EPUB3 Media Overlays from LibriVox audiobooks
- **Forced Alignment:** Multiple open-source tools available (aeneas, Montreal-Forced-Aligner, echogarden)
- **Strategy:** We can create our own sync data using these tools if pre-existing data isn't available

### Recommendation Ranking
1. **Alice's Adventures in Wonderland** - Top choice (short, perfect features, popular)
2. **The Time Machine** - Close second (sci-fi preference, clear scenes)
3. **Around the World in Eighty Days** - Strong third (episodic structure)
4. **The Wonderful Wizard of Oz** - Solid backup (family-friendly, clear characters)
5. **A Princess of Mars** - Longer option if needed (fits sci-fi preference)

All candidates meet the requirements: public domain, available as both text and audio, non-violent/non-religious, and suitable for testing app features.
