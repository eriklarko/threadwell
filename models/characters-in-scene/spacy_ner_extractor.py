## REQUIRED MODELS:
## python -m spacy download en_core_web_trf
## pip install https://github.com/explosion/spacy-experimental/releases/download/v0.6.1/en_coreference_web_trf-3.4.0a2-py3-none-any.whl

import spacy
from dataclasses import dataclass
from typing import List, Tuple



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


class SpacyProcessor:
    def __init__(self):
        print("Loading spaCy model 'en_core_web_trf'")
        self.nlp = spacy.load("en_core_web_trf")

        # Debug: print pipeline components before adding coref
        print(f"Pipeline components before coref: {self.nlp.pipe_names}")

        print("Loading pre-trained coreference model")
        # Load the pre-trained coreference model instead of adding experimental component
        self.coref_nlp = spacy.load("en_coreference_web_trf")
        print("Pre-trained coreference model loaded successfully")

    def extract_entities_and_coref(self, text: str) -> Tuple[List, List]:
        # Use main NLP model for NER
        doc = self.nlp(text)

        # Debug: print all entities with their labels
        #print(f"All entities found: {[(ent.text, ent.label_, ent.start_char, ent.end_char) for ent in doc.ents]}")
        #print(json.dumps(doc.to_json(), indent=2))

        persons = [ent for ent in doc.ents if ent.label_ == "PERSON"]

        # Use separate coref model
        coref_doc = self.coref_nlp(text)
        coref = coref_doc.spans.get("coref_clusters", [])

        return persons, coref


processor = SpacyProcessor()

def extract_characters_from_scene(text: str) -> List[Character]:
    """Extract characters from a scene text using spaCy."""

    print(f"Processing scene text of length {len(text)} ({text[:50]}...)")

    # TODO: co-reference resolution obv
    persons, _ = processor.extract_entities_and_coref(text)
    print(f"Found {len(persons)} person entities in scene")

    characters = {}
    for ent in persons:
        cid = ent.text.lower().replace(' ', '_')
        print(f"  Entity {cid} ('{ent.text}') at tokens {ent.start_char}-{ent.end_char}")

        if cid not in characters:
            characters[cid] = Character(ent.text, [ent.text], ent.start_char, [])

        # TODO: this should be the whole sentence actually?
        context = text[max(ent.start_char-5, 0):ent.end_char+5]
        mention = Mention(ent.start_char, ent.end_char, ent.text, context)
        characters[cid].mentions.append(mention)

    print(f"Extracted {len(characters)} characters from scene")
    return list(characters.values())


