import json
import os
import glob
import sys


def get_json_files(path):
    """Get list of JSON files from path (file or directory)."""

    absolute_path = os.path.abspath(path)

    if not os.path.exists(absolute_path):
        print(f"Error: Path does not exist: {absolute_path}")
        sys.exit(1)

    if os.path.isfile(absolute_path):
        return [absolute_path]

    json_files = glob.glob(os.path.join(absolute_path, "*.json"))
    if not json_files:
        print(f"Error: No JSON files found in directory: {absolute_path}")
        sys.exit(1)

    return sorted(json_files)


def validate_and_load_scene_file(file_path):
    """Validate the input file path and load the scene data from JSON."""

    absolute_path = os.path.abspath(file_path)
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


def update_scene(file_path, scene_data):
    """Save the extracted characters back to the JSON file."""

    with open(file_path, "w") as f:
        json.dump(scene_data, f, indent=2)

    print(f"Updated JSON file: {file_path}")

