import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import { createNote } from './noteService'

export default function CreateNote (props) {
  function createNoteFrom (noteId) {
    createNote(props.uid, noteId)
  }

  const noteId = uuidv1()
  return (
    <Link onClick={() => createNoteFrom(noteId)} to={'/' + noteId}>Create note</Link>
  )
}

CreateNote.propTypes = {
  uid: PropTypes.string.isRequired
}
