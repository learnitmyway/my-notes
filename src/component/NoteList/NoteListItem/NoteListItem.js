import React from 'react'
import PropTypes from 'prop-types'

import arrow from './arrow.svg'
import './NoteListItem.css'

export default function NoteListItem (props) {
  return (
    <div className='NoteListItem'>
      <div className='NoteListItem-title'>{props.title}</div>
      <img className='NoteList-arrow' src={arrow} alt='right arrow' />
    </div>
  )
}

NoteListItem.propTypes = {
  title: PropTypes.string.isRequired
}
