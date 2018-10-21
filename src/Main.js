import React from 'react'
import uuidv1 from 'uuid/v1'

import { createNote } from './noteService'

export default function Main (props) {
  function createNoteFrom (noteId) {
    createNote(props.uid, noteId)
  }

  const noteId = uuidv1()
  return (
    <button onClick={() => createNoteFrom(noteId)}>Create note</button>
  )
}
