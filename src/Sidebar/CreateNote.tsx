import React from 'react'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import { createNote } from '../noteService/noteService'
import styles from './CreateNote.module.css'

export interface Props {
  uid: string
}

export default function CreateNote(props: Props) {
  const noteId = uuidv1()

  function handleClick() {
    createNote(props.uid, noteId)
  }

  return (
    <div className={styles.CreateNote}>
      <Link
        className={styles.btn}
        data-testid="CreateNote__btn"
        onClick={handleClick}
        to={'/' + noteId}
      >
        Create Note
      </Link>
    </div>
  )
}
