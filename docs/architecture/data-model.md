# Book

id: ID
authorId: ID

title: string

coverArt: LocalFilePath

audioFile: LocalFilePath

scenes: Scene[] # potentially big, lazy load please


# Author

id: ID

name: string

book_ids: ID[]


# Scene

description: string

characters: Character[]


# Character

id: ID

name: string

avatar?: string


