import React from 'react'

import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

import CurrentNote from '../CurrentNote'

import './Sidebar.css'

export interface Props {
  currentNote: CurrentNote
  match: any
  small: boolean
  uid: string
}

export default function Sidebar(props: Props) {
  const { currentNote, match, small, uid } = props
  return (
    <div
      data-testid="Sidebar"
      className={small ? 'Sidebar' : 'Sidebar Sidebar--not-small'}
    >
      <CreateNote uid={uid} />
      <NoteList uid={uid} match={match} currentNote={currentNote} />
    </div>
  )
}
