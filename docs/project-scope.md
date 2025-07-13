# Project Scope: Threadwell Audiobook App

## What is Threadwell?

Imagine listening to your favorite audiobook and being able to instantly ask questions about the story, just like you would with a friend. Threadwell is a new mobile app for audiobook lovers that makes this possible. It's for anyone who enjoys audiobooks but wants to dive deeper into the stories they love.

Think of it as a smart audiobook player that helps you keep track of everything that's happening, without losing your place.

## What does it do? (Core Features)

Threadwell is more than just a play button. It gives you special controls to explore the story in new ways:

*   **Smart Rewind:** Did you miss something? Instantly jump back to the beginning of the last paragraph to catch up.
*   **Smart Forward:** Already heard this? Skip to the next paragraph.

*   **Scene Rewind:** Want to remember how the characters got to a specific location? Rewind to the start of their journey in the current scene.
*   **Who's Here?:** Instantly see a list of all the characters present in the scene you're listening to.
*   **Character Dossier:** Get a quick summary of what a character looks like or review a complete history of everything they've done in the story so far.
*   **Ask Me Anything (About the Book):** Have a question about the plot, a character, or a location? Just ask! The app's chat feature will answer your questions based *only* on the parts of the book you've already heard, so you never have to worry about spoilers.

## Who is it for?

This app is for every audiobook listener who has ever wished for more from their listening experience. If you love getting lost in stories and want a richer, more interactive way to enjoy your books, Threadwell is for you.

## What will it be built with?

Threadwell will be a mobile app for both iPhone and Android, built using React Native.

### App architecture

The app is designed to be kind of dumb - or a presentation layer to rich data. We'll have a bunch of models on the backend analyzing the books and generating data that the app will use for its features.

While developing the app we will use stubbed data files, likely json for the smart rewind, How's here and Dossier features.

The AMA feature will require some sort of direct LLM call, but we can assume that's a black box for now.

See docs/architecture