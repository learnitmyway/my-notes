import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import arrow from './arrow.svg'
import './NoteListItem.css'

export default function NoteListItem (props) {
  return (
    <Link className='NoteListItem' to={'/' + props.noteId}>
      <div className='NoteListItem-title'>{props.title}</div>
      <img className='NoteList-arrow' src={arrow} alt='right arrow' />
    </Link>
  )
}

NoteListItem.propTypes = {
  title: PropTypes.string.isRequired,
  noteId: PropTypes.string.isRequired
}
