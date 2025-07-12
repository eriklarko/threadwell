#!/bin/bash

# =============================================================================
# Threadwell Asset Download Script
# Downloads all required assets for Alice's Adventures in Wonderland
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ASSETS_DIR="assets/books/alice-in-wonderland"
PROJECT_GUTENBERG_URL="https://www.gutenberg.org/files/11/11-0.txt"
ARCHIVE_BASE_URL="https://www.archive.org/download/alices_adventures_1003"

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

print_header() {
    echo -e "${BLUE}"
    echo "=================================================================="
    echo "  Threadwell Asset Download"
    echo "  Alice's Adventures in Wonderland"
    echo "=================================================================="
    echo -e "${NC}"
}

check_dependencies() {
    log_info "Checking dependencies..."

    if ! command -v curl &> /dev/null; then
        log_error "curl is required but not installed. Please install curl."
        exit 1
    fi

    if ! command -v du &> /dev/null; then
        log_error "du command not found. This should be available on all Unix systems."
        exit 1
    fi

    log_success "All dependencies found"
}

create_directory_structure() {
    log_info "Creating directory structure..."

    # Create all necessary directories
    mkdir -p "${ASSETS_DIR}/text/alice-chapters"
    mkdir -p "${ASSETS_DIR}/audio/librivox-hughes"
    mkdir -p "${ASSETS_DIR}/supplementary"

    # Create .gitkeep files to preserve directory structure
    touch "${ASSETS_DIR}/audio/.gitkeep"

    log_success "Directory structure created"
}

download_text() {
    log_info "Downloading text resources..."

    local text_file="${ASSETS_DIR}/text/alice-full.txt"

    if [[ -f "$text_file" ]]; then
        log_warning "Text file already exists: $text_file"
        read -p "Overwrite? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Skipping text download"
            return
        fi
    fi

    log_info "Downloading from Project Gutenberg..."
    if curl -f -L "$PROJECT_GUTENBERG_URL" -o "$text_file"; then
        log_success "Text downloaded: $text_file"

        # Verify file size (should be around 148KB)
        local file_size=$(du -h "$text_file" | cut -f1)
        log_info "File size: $file_size"

        # Basic content verification
        if grep -q "Alice's Adventures in Wonderland" "$text_file"; then
            log_success "Text content verified"
        else
            log_warning "Text content verification failed - please check manually"
        fi
    else
        log_error "Failed to download text file"
        exit 1
    fi
}

download_audio() {
    log_info "Downloading audio resources (12 chapters, ~154MB total)..."
    log_warning "This will take several minutes depending on your connection"

    local audio_dir="${ASSETS_DIR}/audio/librivox-hughes"

    # Check if any audio files already exist
    if find "$audio_dir" -name "*.mp3" | grep -q .; then
        log_warning "Audio files already exist in: $audio_dir"
        read -p "Re-download all? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Skipping audio download"
            return
        fi
    fi

    cd "$audio_dir"

    log_info "Downloading chapters 1-12..."
    local failed_downloads=()

    for i in {01..12}; do
        local chapter_file="chapter-${i}.mp3"
        local download_url="${ARCHIVE_BASE_URL}/alices_adventures_${i}_carroll.mp3"

        echo -n "Chapter $i: "

        if curl -f -L "$download_url" -o "$chapter_file" --progress-bar; then
            # Verify file size (should be 9-16MB)
            local file_size=$(du -h "$chapter_file" | cut -f1)
            echo -e " ${GREEN}✓${NC} Downloaded ($file_size)"
        else
            echo -e " ${RED}✗${NC} Failed"
            failed_downloads+=("$i")
        fi
    done

    cd - > /dev/null

    if [[ ${#failed_downloads[@]} -eq 0 ]]; then
        log_success "All 12 chapters downloaded successfully"
    else
        log_error "Failed to download chapters: ${failed_downloads[*]}"
        log_info "You can retry individual chapters manually or run this script again"
        return 1
    fi
}

verify_downloads() {
    log_info "Verifying downloads..."

    # Check text file
    local text_file="${ASSETS_DIR}/text/alice-full.txt"
    if [[ -f "$text_file" ]]; then
        log_success "Text file present: $(du -h "$text_file" | cut -f1)"
    else
        log_error "Text file missing: $text_file"
        return 1
    fi

    # Check audio files
    local audio_dir="${ASSETS_DIR}/audio/librivox-hughes"
    local audio_count=$(find "$audio_dir" -name "*.mp3" | wc -l)

    if [[ $audio_count -eq 12 ]]; then
        local total_size=$(du -sh "$audio_dir" | cut -f1)
        log_success "All 12 audio chapters present ($total_size total)"
    else
        log_error "Expected 12 audio files, found $audio_count"
        return 1
    fi

    # Summary
    local total_assets_size=$(du -sh "${ASSETS_DIR}" | cut -f1)
    log_success "Total assets size: $total_assets_size"
}

create_metadata() {
    log_info "Creating metadata file..."

    local metadata_file="${ASSETS_DIR}/text/metadata.json"

    cat > "$metadata_file" << 'EOF'
{
  "title": "Alice's Adventures in Wonderland",
  "author": "Lewis Carroll",
  "published": "1865",
  "source": {
    "text": {
      "provider": "Project Gutenberg",
      "id": "11",
      "url": "https://www.gutenberg.org/files/11/11-0.txt",
      "format": "UTF-8 plain text"
    },
    "audio": {
      "provider": "LibriVox via Internet Archive",
      "collection": "alices_adventures_1003",
      "reader": "Kristin Hughes et al.",
      "format": "MP3",
      "chapters": 12
    }
  },
  "content": {
    "chapters": 12,
    "estimated_reading_time": "1.5-2 hours",
    "estimated_listening_time": "2.5-3 hours",
    "word_count": 26000,
    "genre": "Fantasy/Children's Literature",
    "language": "English"
  },
  "processing": {
    "downloaded": "auto-generated",
    "sync_status": "pending",
    "quality_verified": "pending"
  }
}
EOF

    log_success "Metadata created: $metadata_file"
}

print_summary() {
    echo
    echo -e "${GREEN}"
    echo "=================================================================="
    echo "  Download Complete!"
    echo "=================================================================="
    echo -e "${NC}"
    echo
    echo "Assets are now available in: ${ASSETS_DIR}"
    echo
    echo "Next steps:"
    echo "1. Run 'scripts/verify-assets.sh' to perform quality checks"
    echo "2. Start development with your React Native app"
    echo "3. Use 'scripts/setup-development.sh' for full environment setup"
    echo
    echo "Structure created:"
    echo "  📄 Text: alice-full.txt (~148KB)"
    echo "  🎵 Audio: 12 MP3 chapters (~154MB total)"
    echo "  📋 Metadata: metadata.json"
    echo
}

# Main execution
main() {
    print_header

    # Ensure we're in the right directory
    if [[ ! -f "docs/Project_Scope.md" ]]; then
        log_error "This script must be run from the Threadwell project root directory"
        exit 1
    fi

    check_dependencies
    create_directory_structure
    download_text
    download_audio
    verify_downloads
    create_metadata
    print_summary
}

# Allow script to be sourced for testing
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
