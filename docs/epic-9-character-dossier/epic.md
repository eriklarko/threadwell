# Character Tracking System Requirements

## Overview
Build a CLI tool to process books and generate spoiler-free character descriptions based on reading progress using modern spaCy with experimental coreference resolution.

## Core Components

### Text Processing Pipeline
- **Input**: scene text + characters mentioned in scene + reading position
- **Position Filtering**: Return character data up to specified position only
- **Summarization**: Take a list of scenes and summarize them from one character's point of view

### CLI Interface
```bash
# Get character info at specific position
python character_tracker.py query /path/to/scenes/ --character "Gandalf" --max-scene 10 # user read up to scene 10
Gandalf is a tall human dressed in Grey. He's currently in the Shire watching fireworks.
```

## Implementation Requirements

### Position-Based Filtering
```python
def get_safe_mentions(character_id: str, user_position: int) -> Iterable[Mention]:
    # Only return mentions before user's current position
    # start with the most recent scene and move back
    for i in range(user_position, 0, -1):
        if character_id in self.scenes_by_reading_order[i].affected_characters:
            yield scene

def get_safe_character_summary(self, char_id: str, user_position: int) -> str:
    safe_mentions = list(self.get_safe_mentions(char_id, user_position))
    # TODO: Do we need to do more parsing here to extract only the parts that actually affect the character? Probably yes

    # TODO: ask LM to generate summary
    return self.language_model.summarize(safe_mentions)
```

### Character Summary Generation
- Extract key actions/events from mention contexts
- Build chronological narrative from safe mentions
- Identify relationships from co-occurrence patterns
- Generate natural language summary

## CLI Commands

### Query Command
```python
@click.command()
@click.option('--scene-dir', required=True, help='path to scene jsons')
@click.option('--character', required=True, help='Character name')
@click.option('--position', type=int, required=True, help='the index of the scene to use as context cut off (omg thats obtuse)')
def query(book, character, position):
    """Get character history up to position"""
```

## Error Handling
- Graceful handling of malformed text
- Provide helpful CLI error messages
