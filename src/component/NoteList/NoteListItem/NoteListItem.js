import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './NoteListItem.css'

export default function NoteListItem (props) {
  return (
    <Link className='NoteListItem' to={'/' + props.noteId}>
      <div className='NoteListItem-title'>{props.title}</div>
    </Link>
  )
}

NoteListItem.propTypes = {
  title: PropTypes.string.isRequired,
  noteId: PropTypes.string.isRequired
}
