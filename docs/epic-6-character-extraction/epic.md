# Epic 6: Extract Characters from a Scene

This epic is about extracting characters from a scene.

## Requirements

### Goal
The primary goal of this epic is to create a program that can identify and extract a list of characters from a given block of text representing a scene from a book. This will power the "Who's Here?" feature in the Threadwell app.

### Input
- A string containing a block of text. This text can span multiple paragraphs and represents a single "scene".

### Output
- A JSON object containing a single key, "characters", with a value being a list of strings.
- Each string in the list is the name of a character identified in the scene.
- Example: `{"characters": ["Alice", "The White Rabbit"]}`

### Character Definition
- The program should extract all named characters.
- It should also include characters who are mentioned but not physically present (e.g., "Alice thought about her sister.").
- It should include characters referred to by a description (e.g., "the soldier", "the tall man").
- Pronoun resolution (e.g., "he", "she") is not required at this stage.

### Test Data
- The program will be developed and tested using training data.
- The test data will be located in `assets/books/alice-in-wonderland/training-data/characters-in-scene/scenes.json`.
- The structure of the JSON file will be:
  ```json
  [{
    "scene_text": "The full text of the scene...",
    "characters": ["Character One", "Character Two"]
  }]
  ```

## documentation

https://dspy.ai/tutorials/entity_extraction/

## deliverables 1

a program that uses a foundation model to extract characters from a scene

## deliverables 2

Could I use NER for this instead?