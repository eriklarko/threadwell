import json
from pathlib import Path
import sys
import click
import spacy
from dataclasses import dataclass, asdict
from typing import List, Tuple
import logging

logging.basicConfig(format='%(asctime)s %(levelname)s:%(message)s', level=logging.INFO)

@dataclass
class Mention:
    start: int
    end: int
    text: str
    context: str

@dataclass
class Character:
    primary_name: str
    aliases: List[str]
    first_appearance: int
    mentions: List[Mention]

class CharacterRegistry:
    def __init__(self):
        self.metadata = {}
        self.characters = {}

    def add_character(self, char_id: str, character: Character):
        self.characters[char_id] = character

    def save_to_json(self, filepath: str):
        data = {
            "book_metadata": self.metadata,
            "characters": {
                cid: {
                    "primary_name": ch.primary_name,
                    "aliases": ch.aliases,
                    "first_appearance": ch.first_appearance,
                    "mentions": [asdict(m) for m in ch.mentions]
                } for cid, ch in self.characters.items()
            }
        }
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)

    @staticmethod
    def load_from_json(filepath: str) -> 'CharacterRegistry':
        with open(filepath) as f:
            data = json.load(f)
        reg = CharacterRegistry()
        reg.metadata = data.get("book_metadata", {})
        for cid, cdata in data.get("characters", {}).items():
            mentions = [Mention(**m) for m in cdata.get("mentions", [])]
            char = Character(cdata["primary_name"], cdata["aliases"], cdata["first_appearance"], mentions)
            reg.add_character(cid, char)
        return reg

class SpacyProcessor:
    def __init__(self):
        logging.info("Loading spaCy model 'en_core_web_trf'")
        self.nlp = spacy.load("en_core_web_trf")

        # Debug: print pipeline components before adding coref
        logging.info(f"Pipeline components before coref: {self.nlp.pipe_names}")

        logging.info("Loading pre-trained coreference model")
        # Load the pre-trained coreference model instead of adding experimental component
        self.coref_nlp = spacy.load("en_coreference_web_trf")
        logging.info("Pre-trained coreference model loaded successfully")

    def extract_entities_and_coref(self, text: str) -> Tuple[List, List]:
        # Use main NLP model for NER
        doc = self.nlp(text)

        # Debug: print all entities with their labels
        logging.info(f"All entities found: {[(ent.text, ent.label_, ent.start_char, ent.end_char) for ent in doc.ents]}")
        print(json.dumps(doc.to_json(), indent=2))

        persons = [ent for ent in doc.ents if ent.label_ == "PERSON"]

        # Use separate coref model
        coref_doc = self.coref_nlp(text)
        coref = coref_doc.spans.get("coref_clusters", [])

        return persons, coref

class CharacterTracker:
    def __init__(self):
        self.processor = SpacyProcessor()
        self.registry = CharacterRegistry()

    def process_scene(self, text: str):
        logging.info(f"Processing scene text of length {len(text)} ({text[:50]}...)")
        # Process a single scene text and extract character mentions
        persons, _ = self.processor.extract_entities_and_coref(text)
        logging.info(f"Found {len(persons)} person entities in scene")
        for ent in persons:
            logging.info(f"Entity '{ent.text}' at tokens {ent.start_char}-{ent.end_char}")
            cid = ent.text.lower().replace(' ', '_')
            if cid not in self.registry.characters:
                logging.info(f"Adding new character '{ent.text}' with id '{cid}' at position {ent.start}")
                self.registry.add_character(cid, Character(ent.text, [ent.text], ent.start_char, []))

            # TODO: this should be the whole sentence actually
            context = text[max(ent.start_char-5, 0):ent.end_char+5]
            mention = Mention(ent.start_char, ent.end_char, ent.text, context)
            self.registry.characters[cid].mentions.append(mention)

    def get_character_at_position(self, registry: CharacterRegistry, char_name: str, position: int):
        for ch in registry.characters.values():
            if ch.primary_name.lower() == char_name.lower():
                safe = [m for m in ch.mentions if m.start_token <= position]
                return Character(ch.primary_name, ch.aliases, ch.first_appearance, safe)
        return None

    def list_characters(self, registry: CharacterRegistry, position: int):
        return [ch.primary_name for ch in registry.characters.values() if ch.first_appearance <= position]

# CLI
# Remove placeholder main

@click.group()
def cli():
    pass

@cli.command()
@click.argument('scene-dir', type=click.Path(exists=True))
@click.option('--output', '-o', default='characters.json')
def process(scene_dir, output):
    """Process book and extract character data"""
    logging.info(f"Starting process command: scene-dir={scene_dir}, output={output}")
    tracker = CharacterTracker()

    if scene_dir.endswith(".json"):
        with open(scene_dir) as f:
            text = json.load(f).get("scene_text", "")
            tracker.process_scene(text)
    else:
        for scene_file in Path(scene_dir).glob("*.json"):
            with open(scene_file) as f:
                text = json.load(f).get("scene_text", "")
                tracker.process_scene(text)

    # TODO:
    #tracker.registry.metadata = {"title": book_file, "total_tokens": len(text.split()), "processed_date": ""}
    tracker.registry.save_to_json(output)
    click.echo(f"Saved character data to {output}")

@cli.command()
@click.option('--book', required=True, type=click.Path(exists=True), help='Character data file')
@click.option('--character', required=True, help='Character name')
@click.option('--position', type=int, required=True, help='Reading position')
def query(book, character, position):
    """Get character history up to position"""
    reg = CharacterRegistry.load_from_json(book)
    tracker = CharacterTracker()
    result = tracker.get_character_at_position(reg, character, position)
    if result:
        click.echo(json.dumps(asdict(result), indent=2))
    else:
        click.echo(f"Character {character} not found")

@cli.command(name='list')
@click.option('--book', required=True, type=click.Path(exists=True), help='Character data file')
@click.option('--position', type=int, required=True, help='Reading position')
def list_characters_cmd(book, position):
    """List all characters known at position"""
    reg = CharacterRegistry.load_from_json(book)
    tracker = CharacterTracker()
    names = tracker.list_characters(reg, position)
    click.echo("\n".join(names))

if __name__ == '__main__':
    cli()
