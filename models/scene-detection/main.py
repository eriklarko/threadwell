from pathlib import Path
from typing import List
import json
import nltk
from nltk.tokenize import TextTilingTokenizer


def load_text_file(file_path: str) -> str:
    """Load text from a file, handling relative paths from the current script location."""
    current_dir = Path(__file__).parent
    full_path = current_dir / file_path

    with open(full_path, 'r', encoding='utf-8') as file:
        return file.read()


def split_text_into_scenes(text: str, w: int = 20, k: int = 10) -> List[str]:
    """
    Split text into scenes using NLTK's TextTiling algorithm.

    Args:
        text: The input text to split into scenes
        w: Block size - number of sentences in a block (default: 20)
        k: Number of blocks to compare for boundary detection (default: 10)

    Returns:
        List of text scenes as strings
    """
    # Download required NLTK data if not present
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')

    try:
        nltk.data.find('tokenizers/punkt_tab')
    except LookupError:
        nltk.download('punkt_tab')

    # Initialize the TextTiling tokenizer
    tokenizer = TextTilingTokenizer(w=w, k=k)

    # Split the text into scenes
    scenes = tokenizer.tokenize(text)

    # Clean up the scenes by stripping whitespace
    cleaned_scenes = [scene.strip() for scene in scenes if scene.strip()]

    return cleaned_scenes


def write_scenes_to_json(scenes: List[str], output_dir: str) -> None:
    """
    Write each scene to a separate JSON file.

    Args:
        scenes: List of scene text strings
        output_dir: Directory path to write the JSON files
    """
    current_dir = Path(__file__).parent
    full_output_dir = current_dir / output_dir

    # Create the output directory if it doesn't exist
    full_output_dir.mkdir(parents=True, exist_ok=True)

    # Write each scene to a separate JSON file
    for i, scene in enumerate(scenes, 1):
        scene_data = {"scene_text": scene}
        output_file = full_output_dir / f"scene_{i:03d}.json"

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(scene_data, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(scenes)} scenes to {full_output_dir}")


def main():
    """Main function to demonstrate scene detection on Alice in Wonderland."""
    print("Scene Detection using TextTiling")
    print("=" * 40)

    try:
        # Load the Alice in Wonderland text
        text = load_text_file("../../assets/books/alice-in-wonderland/text/alice-full.txt")
        print(f"Loaded text with {len(text)} characters")

        # Split into scenes
        scenes = split_text_into_scenes(text)
        print(f"Detected {len(scenes)} scenes")

        # Write scenes to JSON files
        write_scenes_to_json(scenes, "../../assets/books/alice-in-wonderland/text/scenes/")

        # Display first few scenes with preview
        for i, scene in enumerate(scenes[:3]):
            print(f"\n--- Scene {i+1} ---")
            # Show first 200 characters of each scene
            preview = scene[:200] + "..." if len(scene) > 200 else scene
            print(preview)
            print(f"Scene length: {len(scene)} characters")

    except FileNotFoundError:
        print("Error: Could not find the Alice in Wonderland text file.")
        print("Make sure the file exists at: assets/books/alice-in-wonderland/text/alice-full.txt")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
