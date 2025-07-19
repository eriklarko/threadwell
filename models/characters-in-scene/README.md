# Character Extraction

Extract character names from book scenes using AI.

## Setup

1. Install dependencies:
   ```bash
   uv install
   ```

2. Add your Anthropic API key:
   ```bash
   echo "your-api-key" > anthropic-api-key.secret
   ```

## Usage

Process a single JSON file:
```bash
python main.py scene.json
```

Process all JSON files in a directory:
```bash
python main.py /path/to/scenes/
```

## Input

JSON files must contain a `scene_text` field:
```json
{
  "scene_text": "Alice was beginning to get very tired..."
}
```

## Output

Adds a `characters` field to each JSON file:
```json
{
  "scene_text": "Alice was beginning to get very tired...",
  "characters": ["Alice", "White Rabbit"]
}
```

