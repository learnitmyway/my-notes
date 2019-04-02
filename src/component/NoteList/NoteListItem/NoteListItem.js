import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './NoteListItem.css'

export default function NoteListItem(props) {
  let classNames = 'NoteListItem '
  if (props.isSelected) {
    classNames += 'NoteListItem--selected'
  }

  return (
    <Link className={classNames} to={'/' + props.noteId}>
      <div data-test="NoteListItem__title" className="NoteListItem-title">
        {props.title}
      </div>
    </Link>
  )
}

NoteListItem.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  noteId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
