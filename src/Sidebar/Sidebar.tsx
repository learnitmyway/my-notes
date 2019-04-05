import React from 'react'

import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

import CurrentNote from '../CurrentNote'

import './Sidebar.css'

export interface Props {
  classNames?: string
  currentNote: CurrentNote
  match: any
  uid: string
}

export default function Sidebar(props: Props) {
  let classNames = 'Sidebar '
  if (props.classNames) {
    classNames += props.classNames
  }

  return (
    <div data-testid='Sidebar' className={classNames}>
      <CreateNote uid={props.uid} />
      <NoteList
        uid={props.uid}
        match={props.match}
        currentNote={props.currentNote}
      />
    </div>
  )
}
