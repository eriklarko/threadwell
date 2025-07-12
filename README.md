# 🎧 Threadwell - Smart Audiobook App

> *Imagine listening to your favorite audiobook and being able to instantly ask questions about the story, just like you would with a friend.*

Threadwell is a React Native mobile app that transforms the audiobook listening experience with intelligent features for deeper story engagement.

## ✨ Core Features

- **Smart Rewind** - Jump back to the beginning of the last paragraph instantly
- **Scene Navigation** - Rewind to the start of the current scene or location
- **Who's Here?** - See all characters present in the current scene
- **Character Dossier** - Quick character summaries and complete story history
- **Ask Me Anything** - Chat about the book without spoilers (based only on what you've heard)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ LTS
- React Native development environment
- Git

### Setup

1. **Clone and setup**
   ```bash
   git clone <your-repo-url>
   cd threadwell
   ```

2. **Download assets**
   ```bash
   ./scripts/download-assets.sh
   ```

3. **Verify setup**
   ```bash
   ./scripts/verify-assets.sh
   ```

4. **Start development**
   ```bash
   cd app/
   npm install
   npx react-native run-android  # or run-ios
   ```

## 📁 Project Structure

```
threadwell/
├── 📱 app/                    # React Native application
├── 📚 assets/                 # Book content (downloaded separately)
│   └── books/
│       └── alice-in-wonderland/
│           ├── text/          # Project Gutenberg text
│           ├── audio/         # LibriVox MP3 files (154MB)
│           └── supplementary/ # Metadata & analysis
├── 📖 docs/                   # Project documentation & planning
│   ├── Project_Scope.md       # What we're building
│   └── epic-*/                # Development phases
└── 🔧 scripts/               # Asset management tools
    ├── download-assets.sh     # Get all book content
    └── verify-assets.sh       # Check asset quality
```

## 📚 Content

**Current Book**: Alice's Adventures in Wonderland by Lewis Carroll
- **Why this book?** Perfect length (2-3 hours), rich characters, clear scenes, family-friendly
- **Text Source**: Project Gutenberg (public domain)
- **Audio Source**: LibriVox (high-quality recordings)
- **Format**: 12 chapters, ~154MB total audio

## 🎯 Development Roadmap

- [x] **Epic 1**: Content selection and asset download ✅
- [ ] **Epic 2**: UI/UX design and mockups
- [ ] **Epic 3**: Basic React Native app structure
- [ ] **Epic 4**: Simple audio playback controls
- [ ] **Epic 5**: Text-audio synchronization
- [ ] **Epic 6**: Smart navigation features
- [ ] **Epic 7**: Character tracking and chat

## 🛠 Architecture

**Frontend**: React Native (iOS + Android)
**Content**: Public domain books + LibriVox audiobooks
**Sync**: Text-audio alignment using forced alignment tools
**Storage**: Local file system with metadata indexing

## 🤝 Contributing

1. Check existing issues or create a new one
2. Fork the repository
3. Create a feature branch: `git checkout -b feature/smart-rewind`
4. Make your changes and test
5. Commit: `git commit -m 'Add smart rewind feature'`
6. Push and create a Pull Request

## 📋 Asset Management

Large audio files (154MB) are **not stored in git** to keep the repository lightweight:

- **Download**: Use `./scripts/download-assets.sh` to get all content
- **Verify**: Use `./scripts/verify-assets.sh` to check quality
- **Sources**: All assets come from public domain sources (Project Gutenberg + LibriVox)

This approach ensures:
- ✅ Fast repository cloning
- ✅ No git history bloat
- ✅ Easy asset updates
- ✅ Consistent development environment

## 📖 Documentation

- **Project Vision**: [`docs/Project_Scope.md`](docs/Project_Scope.md)
- **Content Research**: [`docs/epic-1-finding-our-story/`](docs/epic-1-finding-our-story/)
- **Asset Downloads**: [`docs/epic-1-finding-our-story/05-download-raw-assets.md`](docs/epic-1-finding-our-story/05-download-raw-assets.md)

**Ready to revolutionize audiobook listening? Let's build something amazing! 🚀**
