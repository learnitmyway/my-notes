import classNames from 'classnames'
import React from 'react'

import CreateNote from './CreateNote'
import NoteList from './NoteList'

import NoteTO from '../NoteTO'

import styles from './Sidebar.module.css'

export interface Props {
  currentNote?: NoteTO
  match?: any
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
