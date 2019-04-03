import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import { createNote } from '../noteService/noteService'
import './CreateNote.css'
import plus from './plus.svg'

export interface Props {
  uid: string
}

export default function CreateNote(props: Props) {
  const noteId = uuidv1()

  function handleClick() {
    createNote(props.uid, noteId)
  }

  return (
    <div className="CreateNote">
      <Link
        className="CreateNote-button"
        onClick={handleClick}
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
