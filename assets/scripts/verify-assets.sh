#!/bin/bash

# =============================================================================
# Threadwell Asset Verification Script
# Performs comprehensive quality checks on downloaded assets
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
    echo "  Threadwell Asset Verification"
    echo "  Quality Control & Validation"
    echo "=================================================================="
    echo -e "${NC}"
}

check_dependencies() {
    log_info "Checking verification tools..."

    local tools=("file" "wc" "grep" "du")
    for tool in "${tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            log_error "$tool is required but not installed"
            exit 1
        fi
    done

    # Check for optional audio tools
    if command -v ffprobe &> /dev/null; then
        log_info "ffprobe found - will perform detailed audio analysis"
        HAS_FFPROBE=true
    else
        log_warning "ffprobe not found - audio analysis will be basic"
        log_info "Install ffmpeg for detailed audio verification"
        HAS_FFPROBE=false
    fi

    log_success "Dependencies checked"
}

verify_directory_structure() {
    log_info "Verifying directory structure..."

    local required_dirs=(
        "${ASSETS_DIR}"
        "${ASSETS_DIR}/text"
        "${ASSETS_DIR}/audio/librivox-hughes"
    )

    local all_good=true
    for dir in "${required_dirs[@]}"; do
        if [[ -d "$dir" ]]; then
            log_success "Directory exists: $dir"
        else
            log_error "Missing directory: $dir"
            all_good=false
        fi
    done

    if [[ "$all_good" == true ]]; then
        log_success "Directory structure verified"
        return 0
    else
        log_error "Directory structure incomplete"
        return 1
    fi
}

verify_text_quality() {
    log_info "Verifying text quality..."

    local text_file="${ASSETS_DIR}/text/alice-full.txt"

    if [[ ! -f "$text_file" ]]; then
        log_error "Text file not found: $text_file"
        return 1
    fi

    # Check file size (should be around 148KB)
    local file_size_bytes=$(stat -f%z "$text_file" 2>/dev/null || stat -c%s "$text_file" 2>/dev/null)
    local file_size_kb=$((file_size_bytes / 1024))

    if [[ $file_size_kb -gt 100 && $file_size_kb -lt 200 ]]; then
        log_success "Text file size appropriate: ${file_size_kb}KB"
    else
        log_warning "Text file size unexpected: ${file_size_kb}KB (expected ~148KB)"
    fi

    # Check encoding
    local encoding=$(file -b --mime-encoding "$text_file")
    if [[ "$encoding" =~ ^(utf-8|us-ascii)$ ]]; then
        log_success "Text encoding verified: $encoding"
    else
        log_warning "Text encoding unexpected: $encoding"
    fi

    # Check content
    if grep -q "Alice's Adventures in Wonderland" "$text_file"; then
        log_success "Title found in text"
    else
        log_error "Title not found in text"
        return 1
    fi

    if grep -q "Lewis Carroll" "$text_file"; then
        log_success "Author found in text"
    else
        log_warning "Author not clearly found in text"
    fi

    # Check for chapter markers
    local chapter_count=$(grep -c "CHAPTER" "$text_file" || true)
    if [[ $chapter_count -ge 12 ]]; then
        log_success "Found $chapter_count chapter markers"
    else
        log_warning "Only found $chapter_count chapter markers (expected 12+)"
    fi

    # Word count estimation
    local word_count=$(wc -w < "$text_file")
    if [[ $word_count -gt 20000 && $word_count -lt 35000 ]]; then
        log_success "Word count reasonable: $word_count words"
    else
        log_warning "Word count unexpected: $word_count words (expected ~26,000)"
    fi

    # Check for Project Gutenberg artifacts
    if grep -q "Project Gutenberg" "$text_file"; then
        log_info "Project Gutenberg headers/footers present (normal)"
    fi

    log_success "Text quality verification complete"
}

verify_audio_basic() {
    log_info "Verifying audio files (basic checks)..."

    local audio_dir="${ASSETS_DIR}/audio/librivox-hughes"

    if [[ ! -d "$audio_dir" ]]; then
        log_error "Audio directory not found: $audio_dir"
        return 1
    fi

    # Count MP3 files
    local mp3_count=$(find "$audio_dir" -name "*.mp3" | wc -l)
    if [[ $mp3_count -eq 12 ]]; then
        log_success "All 12 MP3 files present"
    else
        log_error "Expected 12 MP3 files, found $mp3_count"
        return 1
    fi

    # Check individual files
    local failed_files=()
    for i in {01..12}; do
        local chapter_file="${audio_dir}/chapter-${i}.mp3"

        if [[ ! -f "$chapter_file" ]]; then
            log_error "Missing: chapter-${i}.mp3"
            failed_files+=("chapter-${i}.mp3")
            continue
        fi

        # Check file size (should be 9-16MB)
        local file_size_bytes=$(stat -f%z "$chapter_file" 2>/dev/null || stat -c%s "$chapter_file" 2>/dev/null)
        local file_size_mb=$((file_size_bytes / 1024 / 1024))

        if [[ $file_size_mb -gt 5 && $file_size_mb -lt 25 ]]; then
            log_success "Chapter $i: ${file_size_mb}MB"
        else
            log_warning "Chapter $i: ${file_size_mb}MB (size seems unusual)"
        fi

        # Check file type
        local file_type=$(file -b "$chapter_file")
        if [[ "$file_type" =~ MP3|MPEG|Audio ]]; then
            # File type is audio-related, good
            :
        else
            log_warning "Chapter $i: File type check: $file_type"
        fi
    done

    if [[ ${#failed_files[@]} -eq 0 ]]; then
        local total_size=$(du -sh "$audio_dir" | cut -f1)
        log_success "Basic audio verification complete: $total_size total"
        return 0
    else
        log_error "Failed files: ${failed_files[*]}"
        return 1
    fi
}

verify_audio_detailed() {
    if [[ "$HAS_FFPROBE" != true ]]; then
        log_info "Skipping detailed audio analysis (ffprobe not available)"
        return 0
    fi

    log_info "Performing detailed audio analysis..."

    local audio_dir="${ASSETS_DIR}/audio/librivox-hughes"
    local analysis_failed=false

    for i in {01..12}; do
        local chapter_file="${audio_dir}/chapter-${i}.mp3"

        if [[ ! -f "$chapter_file" ]]; then
            continue
        fi

        # Get audio properties
        local duration=$(ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$chapter_file" 2>/dev/null || echo "unknown")
        local bitrate=$(ffprobe -v quiet -show_entries format=bit_rate -of default=noprint_wrappers=1:nokey=1 "$chapter_file" 2>/dev/null || echo "unknown")
        local sample_rate=$(ffprobe -v quiet -show_entries stream=sample_rate -of default=noprint_wrappers=1:nokey=1 "$chapter_file" 2>/dev/null || echo "unknown")

        if [[ "$duration" != "unknown" ]]; then
            local duration_min=$(echo "$duration / 60" | bc -l 2>/dev/null | cut -d. -f1 || echo "?")
            log_info "Chapter $i: ${duration_min}min, ${bitrate}bps, ${sample_rate}Hz"

            # Basic sanity checks
            if (( $(echo "$duration > 300" | bc -l 2>/dev/null || echo 0) )); then
                log_warning "Chapter $i seems very long (>5min)"
            fi

            if (( $(echo "$duration < 30" | bc -l 2>/dev/null || echo 0) )); then
                log_warning "Chapter $i seems very short (<30sec)"
            fi
        else
            log_warning "Chapter $i: Could not analyze audio properties"
            analysis_failed=true
        fi
    done

    if [[ "$analysis_failed" == false ]]; then
        log_success "Detailed audio analysis complete"
    else
        log_warning "Some audio files could not be analyzed in detail"
    fi
}

verify_metadata() {
    log_info "Verifying metadata..."

    local metadata_file="${ASSETS_DIR}/text/metadata.json"

    if [[ ! -f "$metadata_file" ]]; then
        log_warning "Metadata file not found: $metadata_file"
        log_info "Run 'scripts/download-assets.sh' to generate metadata"
        return 1
    fi

    # Basic JSON syntax check
    if command -v python3 &> /dev/null; then
        if python3 -m json.tool "$metadata_file" > /dev/null 2>&1; then
            log_success "Metadata JSON syntax valid"
        else
            log_error "Metadata JSON syntax invalid"
            return 1
        fi
    elif command -v jq &> /dev/null; then
        if jq . "$metadata_file" > /dev/null 2>&1; then
            log_success "Metadata JSON syntax valid"
        else
            log_error "Metadata JSON syntax invalid"
            return 1
        fi
    else
        log_info "JSON validation tools not available (install python3 or jq for validation)"
    fi

    # Check for required fields
    if grep -q '"title".*Alice' "$metadata_file"; then
        log_success "Metadata contains title"
    else
        log_warning "Metadata missing or incorrect title"
    fi

    log_success "Metadata verification complete"
}

generate_report() {
    log_info "Generating verification report..."

    local report_file="${ASSETS_DIR}/verification-report.txt"

    cat > "$report_file" << EOF
Threadwell Asset Verification Report
Generated: $(date)

DIRECTORY STRUCTURE:
$(find "$ASSETS_DIR" -type d | sort)

TEXT FILES:
$(find "$ASSETS_DIR" -name "*.txt" -exec ls -lh {} \;)

AUDIO FILES:
$(find "$ASSETS_DIR" -name "*.mp3" -exec ls -lh {} \;)

METADATA FILES:
$(find "$ASSETS_DIR" -name "*.json" -exec ls -lh {} \;)

TOTAL SIZE:
$(du -sh "$ASSETS_DIR")

VERIFICATION STATUS: $(date)
- Text quality: $(verify_text_quality &>/dev/null && echo "PASS" || echo "FAIL")
- Audio files: $(verify_audio_basic &>/dev/null && echo "PASS" || echo "FAIL")
- Metadata: $(verify_metadata &>/dev/null && echo "PASS" || echo "FAIL")

EOF

    log_success "Report generated: $report_file"
}

print_summary() {
    echo
    echo -e "${GREEN}"
    echo "=================================================================="
    echo "  Verification Complete!"
    echo "=================================================================="
    echo -e "${NC}"
    echo
    echo "Asset verification summary:"
    echo "  📄 Text: alice-full.txt"
    echo "  🎵 Audio: 12 MP3 chapters"
    echo "  📋 Metadata: metadata.json"
    echo
    echo "Files are ready for development!"
    echo
    echo "Next steps:"
    echo "1. Start React Native development"
    echo "2. Use assets in your app testing"
    echo "3. Run text-audio synchronization when ready"
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
    verify_directory_structure
    verify_text_quality
    verify_audio_basic
    verify_audio_detailed
    verify_metadata
    generate_report
    print_summary
}

# Allow script to be sourced for testing
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
