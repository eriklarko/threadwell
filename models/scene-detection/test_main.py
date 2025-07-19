import pytest
from main import split_text_into_scenes, load_text_file


def test_load_text_file():
    """Test that we can load the Alice in Wonderland text file."""
    text = load_text_file("../../assets/books/alice-in-wonderland/text/alice-chapters/chapter-1.txt")

    assert text is not None
    assert len(text) > 0
    assert "Alice was beginning to get very tired" in text
    assert "CHAPTER I." in text


def test_split_text_into_scenes_returns_list():
    """Test that split_text_into_scenes returns a list of scenes."""
    # Use a small sample text for testing
    sample_text = """
    CHAPTER I.
    Down the Rabbit-Hole

    Alice was beginning to get very tired of sitting by her sister on the
    bank, and of having nothing to do. She was considering in her own mind
    whether the pleasure of making a daisy-chain would be worth the trouble.

    Suddenly a White Rabbit with pink eyes ran close by her. There was nothing
    so very remarkable in that; nor did Alice think it so very much out of the
    way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!"

    Alice started to her feet, for it flashed across her mind that she had
    never before seen a rabbit with either a waistcoat-pocket, or a watch to
    take out of it, and burning with curiosity, she ran across the field.
    """

    scenes = split_text_into_scenes(sample_text)

    assert isinstance(scenes, list)
    assert len(scenes) > 1
    # Each scene should be a string
    for scene in scenes:
        assert isinstance(scene, str)
        assert len(scene.strip()) > 0


def test_split_text_into_scenes_with_real_file():
    """Test scene detection with the actual Alice in Wonderland file."""
    text = load_text_file("../../assets/books/alice-in-wonderland/text/alice-chapters/chapter-1.txt")
    scenes = split_text_into_scenes(text)

    assert isinstance(scenes, list)
    assert len(scenes) > 1  # Should detect multiple scenes
    assert len(scenes) < 100  # Shouldn't be too granular

    # First scene should contain the beginning
    assert "Alice was beginning to get very tired" in scenes[0]


def test_split_text_into_scenes_with_custom_parameters():
    """Test that we can customize the text tiling parameters."""
    sample_text = """
    This is the first paragraph of the first scene. It talks about one topic
    and contains several sentences that are related to each other.

    This is still part of the first scene. The topic hasn't changed much
    and we're still discussing the same general theme.

    Now we switch to a completely different topic. This is a new scene
    with different vocabulary and different concepts being discussed.

    This continues the second scene with more content about the new topic
    that was introduced in the previous paragraph.
    """

    # Test with different block size
    scenes = split_text_into_scenes(sample_text, w=2, k=2)

    assert isinstance(scenes, list)
    assert len(scenes) > 0
