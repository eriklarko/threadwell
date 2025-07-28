import asyncio
import dspy
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


async def extract_characters_from_scene(scene_text):
    """Extract characters from the scene text using DSPy model."""

    # Run the synchronous DSPy call in a thread pool to avoid blocking
    predictor = create_predictor()

    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, lambda: predictor(scene_text=scene_text))

    return result.characters

