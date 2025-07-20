# BookNLP Character Tracking Implementation

## Overview
Use BookNLP to process entire audiobooks and provide spoiler-free character information based on user reading progress.

## Architecture

1. **Book Ingestion**: Process complete book text with BookNLP
2. **Data Loading**: Parse BookNLP output files into queryable format
3. **Position Filtering**: Return character data up to user's current position
4. **Description Generation**: Summarize character history from filtered mentions

## BookNLP Processing

docs: https://github.com/booknlp/booknlp
docs: https://booknlp.pythonhumanities.com/03_files.html
guide: https://booknlp.pythonhumanities.com/02_starting.html
guide: https://booknlp.pythonhumanities.com/04_character_analysis.html
guide: https://booknlp.pythonhumanities.com/05_events.html

## Data Models

### Character Registry
```python
@dataclass
class Character:
    id: str
    primary_name: str
    aliases: List[str]
    first_appearance: int  # token position
    mentions: List[Mention]

@dataclass
class Mention:
    start_token: int
    end_token: int
    text: str
    context: str  # surrounding text
```

## Position-Based Filtering

### Core Logic
```python
def get_safe_character_data(self, char_id: str, user_position: int):
    # Get all mentions before user's position
    safe_mentions = [
        m for m in character.mentions
        if m.start_token <= user_position
    ]

    # Generate summary from safe mentions only
    return self.summarize_character(safe_mentions)
```
## Implementation Strategy

### Phase 1: Run BookNLP
- Process books with BookNLP offline

### Phase 2: Parse BookNLP output
- Load entity/coref data into database
- Implement position-based filtering
- Generate natural language summaries
