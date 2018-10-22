import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import { createNote } from './noteService'

export default function Main (props) {
  function createNoteFrom (noteId) {
    createNote(props.uid, noteId)
  }

  const noteId = uuidv1()
  return (
    <Link onClick={() => createNoteFrom(noteId)} to={'/' + noteId}>Create note</Link>
  )
}

Main.propTypes = {
  uid: PropTypes.string
}
