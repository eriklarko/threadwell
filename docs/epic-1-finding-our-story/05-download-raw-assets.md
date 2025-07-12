### Task 5: Download and Organize Assets

*   **Goal:** Prepare the chosen book's content for use in the application.
*   **Steps:**
    1.  Download the full ebook text and save it in a structured format (e.g., plain text or Markdown).
    2.  Download all the audio files for the selected audiobook.
    3.  Create a clear and organized folder structure within the project to store these assets.

## Asset Download Plan for Alice's Adventures in Wonderland

### Required Assets

**1. Text Resources**
- **Primary Text:** Project Gutenberg plain text format
- **URL:** https://www.gutenberg.org/files/11/11-0.txt
- **Format:** UTF-8 plain text
- **Size:** ~148 KB

**2. Audiobook Resources**
- **Source:** LibriVox.org
- **Reader:** Multiple options available (recommend Kristin Hughes or Ruth Golding versions)
- **Primary URL:** https://librivox.org/alices-adventures-in-wonderland-by-lewis-carroll/
- **Format:** MP3, individual chapter files
- **Total Duration:** ~2.5-3 hours
- **Chapter Count:** 12 individual audio files

### Recommended Directory Structure

```
assets/
├── books/
│   └── alice-in-wonderland/
│       ├── text/
│       │   ├── alice-full.txt           # Complete Project Gutenberg text
│       │   ├── alice-chapters/          # Chapter-separated text files
│       │   │   ├── chapter-01.txt
│       │   │   ├── chapter-02.txt
│       │   │   └── ... (chapters 3-12)
│       │   └── metadata.json            # Book metadata
│       ├── audio/
│       │   ├── librivox-hughes/         # Kristin Hughes recording
│       │   │   ├── chapter-01.mp3
│       │   │   ├── chapter-02.mp3
│       │   │   └── ... (chapters 3-12)
│       │   └── librivox-golding/        # Ruth Golding recording (backup)
│       │       └── ... (same structure)
│       └── supplementary/
│           ├── character-list.json      # Structured character data
│           ├── chapter-summary.json     # Chapter summaries
│           └── analysis-notes.md        # Literary analysis notes
```

### Download Commands

**1. Text Download**
```bash
# Create directory structure
mkdir -p assets/books/alice-in-wonderland/{text/alice-chapters,audio/librivox-hughes,sync/chapter-sync,supplementary}

# Download main text
curl https://www.gutenberg.org/files/11/11-0.txt -o assets/books/alice-in-wonderland/text/alice-full.txt
```

**2. Audio Download**
LibriVox individual chapter downloads (corrected URL pattern):
```bash
for i in {01..12}; do
  echo "Downloading Chapter $i..."
  curl -L "https://www.archive.org/download/alices_adventures_1003/alices_adventures_${i}_carroll.mp3" -o "chapter-${i}.mp3"
done
```


### Quality Verification

**Text Quality Checks:**
- Verify UTF-8 encoding
- Check for OCR errors or formatting issues
- Ensure chapter breaks are clearly marked
- Remove Project Gutenberg header/footer

**Audio Quality Checks:**
- Verify all 12 chapters present
- Check audio quality and clarity
- Ensure consistent volume levels
- Verify chapter order and numbering

### Backup Strategy

**Primary Sources:**
- Project Gutenberg (text)
- LibriVox.org (audio)

**Backup Sources:**
- Internet Archive (audio mirrors)
- Gutenberg.ca (alternative text source)
- Multiple LibriVox reader versions

### Next Steps

1. **Execute downloads** using the commands above
2. **Verify asset quality** using the quality checks
3. **Document any issues** or alternative sources needed

This asset collection will provide a complete foundation for developing and testing the audio reading app with Alice's Adventures in Wonderland.