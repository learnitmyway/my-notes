import React from 'react'
import PropTypes from 'prop-types'

import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

import './Sidebar.css'

export default function Sidebar(props) {
  let classNames = 'Sidebar '
  if (props.classNames) {
    classNames += props.classNames
  }

  return (
    <div className={classNames}>
      <CreateNote uid={props.uid} />
      <NoteList
        uid={props.uid}
        match={props.match}
        currentNote={props.currentNote}
      />
    </div>
  )
}

Sidebar.propTypes = {
  classNames: PropTypes.string,
  currentNote: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  }),
  uid: PropTypes.string.isRequired
}
