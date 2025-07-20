# Character Extraction from Book Scenes

A DSPy-powered script that uses Anthropic's Claude model to extract character names from book scene text.

## Description

This script uses DSPy (a framework for algorithmically optimizing language model prompts) with Anthropic's Claude-3 Opus model to identify and extract character names from literary text passages. It's designed to analyze book scenes and return a list of characters mentioned or present in the scene.

## Prerequisites

- Python 3.12+
- Anthropic API key
- UV package manager (recommended) or pip

## Setup

1. **Install dependencies:**
   ```bash
   uv install
   ```

   Or if using pip:
   ```bash
   pip install dspy pytest
   ```

2. **Set up your Anthropic API key:**

   Create a file named `anthropic-api-key.secret` in this directory and add your Anthropic API key:
   ```bash
   echo "your-anthropic-api-key-here" > anthropic-api-key.secret
   ```

   Make sure to keep this file secure and never commit it to version control.

## Usage

### Basic Usage

Run the script with the included example scene:

```bash
% uv run hard-coded-scene.py
["Alice", "White Rabbit"]
```

This will analyze the Alice in Wonderland scene and output the extracted characters in JSON format.

