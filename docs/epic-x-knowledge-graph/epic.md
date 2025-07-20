# Epic X: Knowledge Graph for Character and Story Analysis

This epic outlines the plan to build a knowledge graph from the book's text. This graph will serve as the structured data backend for features like the Character Dossier, enabling rich, context-aware queries about characters, locations, events, and their relationships.

## Problem

Currently, generating character histories or understanding complex relationships relies on direct text summarization. This can be imprecise, difficult to filter for spoilers, and lacks the ability to answer complex structural questions about the narrative.

## Solution: A Story Knowledge Graph

We will build a knowledge graph where:

*   **Nodes** represent the core entities of the story:
    *   **Characters:** Alice, The Mad Hatter, etc.
    *   **Locations:** Wonderland, The Rabbit Hole.
    *   **Key Items:** "Drink Me" bottle.
    *   **Events:** The Mad Tea-Party, The Trial.

*   **Edges** represent the relationships between these entities, forming factual "triples":
    *   `(Alice) -[MET_CHARACTER]-> (The Caterpillar)`
    *   `(The Mad Hatter) -[IS_FRIENDS_WITH]-> (The March Hare)`
    *   `(The Mad Tea-Party) -[TOOK_PLACE_AT]-> (The March Hare's House)`

Each edge will be annotated with metadata, critically including the `chapter` or `scene_number` where the relationship occurs.

### Advantages

1.  **Structured Relationship Data:** Directly powers the "Relationships" section of the dossier.
2.  **Complex & Precise Queries:** Allows answering questions like, "Who did Alice meet before the Cheshire Cat?" or "Which characters were at the Mad Tea-Party?"
3.  **Spoiler-Proof History:** By filtering graph traversals on the `chapter` metadata, we can generate character histories that only include events up to the user's current position in the story.
4.  **Inferential Power:** Can uncover implied or second-order relationships (e.g., friend of a friend).

## Implementation Plan

The construction of the knowledge graph will be an NLP pipeline:

1.  **Node Extraction (Named Entity Recognition):**
    *   Process the book's text to identify and categorize all entities (Characters, Locations, etc.).
    *   Leverage and extend the existing `models/characters-in-scene` work.

2.  **Edge Extraction (Relationship Extraction):**
    *   For each pair of entities that appear in proximity, analyze the connecting text to define the relationship (the edge).
    *   This will be done using a Large Language Model (LLM). We will feed sentences/paragraphs to the model and ask it to return a list of `(Subject, Predicate, Object)` triples.

3.  **Graph Construction:**
    *   Store the extracted triples in a graph database.
    *   Initial implementation can use a library like Python's `networkx` for simplicity.
    *   For scalability, a dedicated graph database like Neo4j could be considered in the future.

4.  **History Generation (Graph Traversal):**
    *   When a user requests a character dossier, we will query the graph.
    *   The process will start at the character's node and traverse all connected edges, filtered by the current chapter.
    *   The resulting path of events and relationships will be formatted into a human-readable summary, either via templates or by feeding the structured event list to an LLM for prose generation.

This approach will create a robust and flexible data foundation for a new class of interactive and analytical features.
