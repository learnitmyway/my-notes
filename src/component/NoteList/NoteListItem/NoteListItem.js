import React from 'react'
import PropTypes from 'prop-types'

export default function NoteListItem (props) {
  return (
    <div className='NoteListItem-title'>{props.title}</div>
  )
}

NoteListItem.propTypes = {
  title: PropTypes.string.isRequired
}
