import json
import dspy
import sys
import os
import glob
import asyncio
from typing import List


class CharacterExtraction(dspy.Signature):
    """Extract all characters from a scene text."""

    scene_text: str = dspy.InputField(desc="The text of a scene from a book")
    characters: List[str] = dspy.OutputField(desc="A list of character names found in the scene")


def create_predictor():
    # Load API key from secret file
    with open("anthropic-api-key.secret", "r") as f:
        api_key = f.read().strip()

    # Using Anthropic's Claude model
    lm = dspy.LM("anthropic/claude-opus-4-20250514", api_key=api_key)
    dspy.configure(lm=lm)

    # Create the predictor
    return dspy.ChainOfThought(CharacterExtraction)


def validate_and_load_scene_file(file_path):
    """Validate the input file path and load the scene data from JSON."""
    # Convert to absolute path and validate
    absolute_path = os.path.abspath(file_path)

    if not os.path.exists(absolute_path):
        print(f"Error: File does not exist: {absolute_path}")
        sys.exit(1)

    # Load and validate JSON content
    try:
        with open(absolute_path, "r") as f:
            scene_data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON file {absolute_path}: {e}")
        return None
    except Exception as e:
        print(f"Error reading file {absolute_path}: {e}")
        return None

    if "scene_text" not in scene_data:
        print(f"Warning: JSON file {absolute_path} does not contain a 'scene_text' field, skipping")
        return None

    return scene_data


def get_json_files(path):
    """Get list of JSON files from path (file or directory)."""
    absolute_path = os.path.abspath(path)

    if not os.path.exists(absolute_path):
        print(f"Error: Path does not exist: {absolute_path}")
        sys.exit(1)

    if os.path.isfile(absolute_path):
        if absolute_path.endswith('.json'):
            return [absolute_path]
        else:
            print(f"Error: File must be a JSON file: {absolute_path}")
            sys.exit(1)
    elif os.path.isdir(absolute_path):
        json_files = glob.glob(os.path.join(absolute_path, "*.json"))
        if not json_files:
            print(f"Error: No JSON files found in directory: {absolute_path}")
            sys.exit(1)
        return sorted(json_files)
    else:
        print(f"Error: Path is neither a file nor a directory: {absolute_path}")
        sys.exit(1)


def check_existing_characters_and_confirm(scene_data, file_path):
    """Check if characters already exist and get user confirmation to overwrite."""
    if "characters" in scene_data:
        return False # TODO: remove

        print(f"WARNING: Characters data already exists in {file_path}")
        print(f"Existing characters: {scene_data['characters']}")
        response = input(f"Do you want to continue and overwrite the existing data for {os.path.basename(file_path)}? (y/N): ").strip().lower()
        if response not in ['y', 'yes']:
            print(f"Operation cancelled for {file_path}. Existing data preserved.")
            return False

    return True


async def extract_characters_from_scene(scene_text):
    """Extract characters from the scene text using DSPy model."""
    # Run the synchronous DSPy call in a thread pool to avoid blocking
    loop = asyncio.get_event_loop()
    predictor = create_predictor()
    result = await loop.run_in_executor(None, lambda: predictor(scene_text=scene_text))
    return result.characters


def save_characters_to_file(file_path, scene_data, characters):
    """Save the extracted characters back to the JSON file."""
    scene_data["characters"] = characters
    with open(file_path, "w") as f:
        json.dump(scene_data, f, indent=2)

    print(f"Characters extracted and saved: {json.dumps(characters)}")
    print(f"Updated JSON file: {file_path}")


async def process_single_file(file_path):
    """Process a single JSON file for character extraction."""
    print(f"Processing: {file_path}")

    # Load and validate the scene file
    scene_data = validate_and_load_scene_file(file_path)
    if scene_data is None:
        return False

    # Check for existing characters and get user confirmation if needed
    if not check_existing_characters_and_confirm(scene_data, file_path):
        print(f"Skipped: {file_path}")
        return False

    # Extract characters from the scene text
    characters = await extract_characters_from_scene(scene_data["scene_text"])

    # Save the results back to the file
    save_characters_to_file(file_path, scene_data, characters)
    return True


async def main():
    # Check command line arguments
    if len(sys.argv) != 2:
        print("Usage: python main.py <path-to-scene-json-file-or-directory>")
        print("")
        print("Examples:")
        print("  python main.py scene.json")
        print("  python main.py /path/to/scenes/")
        print("")
        print("JSON files should contain a 'scene_text' field with the text to analyze.")
        sys.exit(1)

    # Get list of JSON files to process
    json_files = get_json_files(sys.argv[1])

    print(f"Found {len(json_files)} JSON file(s) to process")
    print()

    # Process all files in parallel
    tasks = [process_single_file(file_path) for file_path in json_files]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    # Count successful processes
    processed_count = sum(1 for result in results if result is True)

    print()
    print(f"Successfully processed {processed_count} out of {len(json_files)} files")


if __name__ == "__main__":
    asyncio.run(main())
