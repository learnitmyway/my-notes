import classNames from 'classnames'
import React from 'react'

import CreateNote from './CreateNote'
import NoteList from './NoteList'

import NoteListItemTO from '../NoteListItemTO'

import styles from './Sidebar.module.css'

export interface Props {
  currentNote?: NoteListItemTO
  match: {
    params: {
      noteId: string
    }
  }
  open?: boolean
  small: boolean
  uid: string
}

export default function Sidebar(props: Props) {
  const { currentNote, match, open, small, uid } = props
  const className = classNames(
    styles.root,
    small ? styles.small : styles.notSmall,
    open ? styles.open : ''
  )
  return (
    <div data-testid="Sidebar" className={className}>
      <CreateNote uid={uid} />
      <NoteList uid={uid} match={match} currentNote={currentNote} />
    </div>
  )
}
