import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import { createNote } from '../noteService/noteService'
import plus from './plus.svg'
import './CreateNote.css'

export interface Props {
  uid: string
}

export default function CreateNote(props: Props) {
  function createNoteFrom(noteId: string) {
    createNote(props.uid, noteId)
  }

  const noteId = uuidv1()

  return (
    <div className="CreateNote">
      <Link
        className="CreateNote-button"
        onClick={() => createNoteFrom(noteId)}
        to={'/' + noteId}
      >
        <img className="CreateNote-img" src={plus} alt="plus sign" />
      </Link>
    </div>
  )
}

CreateNote.propTypes = {
  uid: PropTypes.string.isRequired
}
