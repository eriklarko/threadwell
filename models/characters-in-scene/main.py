import sys
import asyncio
from fileutils import validate_and_load_scene_file, get_json_files, update_scene
import dspy_llm_extractor
import spacy_ner_extractor


async def process_single_scene(path_to_scene_file):
    """Process a single JSON file for character extraction."""

    print(f"Processing: {path_to_scene_file}")

    # Load and validate the scene file
    scene_data = validate_and_load_scene_file(path_to_scene_file)
    if scene_data is None:
        return False

    if "characters_mentioned" not in scene_data:
        print("Extracting characters mentioned in scene using dspy...")
        characters = await dspy_llm_extractor.extract_characters_from_scene(scene_data["scene_text"])
        print(f"Found characters: {characters}")
        scene_data["characters_mentioned"] = characters

    if "characters_present" not in scene_data:
        print("Extracting characters present in scene using spaCy...")
        c2 = await spacy_ner_extractor.extract_characters_from_scene(scene_data["scene_text"])
        print(f"Found characters: {c2}")
        scene_data["characters_present"] = c2

    # Save the results back to the file
    update_scene(path_to_scene_file, scene_data)
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
    tasks = [process_single_scene(file_path) for file_path in json_files]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    # Count successful processes
    processed_count = sum(1 for result in results if result is True)

    print()
    print(f"Successfully processed {processed_count} out of {len(json_files)} files")


if __name__ == "__main__":
    asyncio.run(main())
