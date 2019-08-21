import React, { useState } from 'react'
import classNames from 'classnames'
import { History } from 'history'

import Note from '../Note/Note'
import Sidebar from '../Sidebar/Sidebar'
import NoteListItemTO, { defaultNote } from '../NoteListItemTO'

import deviceWidths from '../deviceWidths'

import noteStyles from '../Note/Note.module.css'
import styles from './Container.module.css'

export interface Props {
  history: History
  uid: string
  match: {
    params: {
      noteId: string
    }
  }
}

interface State {
  currentNote: NoteListItemTO
}

export default function Container(props: Props) {
  const [currentNote, setCurrentNote] = useState(defaultNote)

  function handleTitleChange(currentNote: NoteListItemTO) {
    setCurrentNote(currentNote)
  }

  const { history, match, uid } = props

  const small = window.innerWidth < deviceWidths.small

  return (
    <>
      <div className={classNames(styles.root, !small && styles.notSmall)}>
        <Sidebar currentNote={currentNote} uid={uid} match={match} />
        <Note
          classNames={classNames(!small && noteStyles.notSmall)}
          history={history}
          onTitleChange={handleTitleChange}
          uid={uid}
          match={match}
        />
      </div>
    </>
  )
}
