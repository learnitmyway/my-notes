import React from 'react'
import PropTypes from 'prop-types'

import Note from '../Note/Note'
import CreateNote from '../CreateNote/CreateNote'

import deviceWidths from '../../deviceWidths'

import './Editor.css'

export default function Editor (props) {
  const largerScreenEditor = (
    <div className='Editor--not-small'>
      <CreateNote classNames='CreateNote--not-small' uid={props.uid} />
      <Note classNames='Note--not-small' {...props} />
    </div>
  )
  return (
    window.innerWidth < deviceWidths.small
      ? <Note {...props} />
      : largerScreenEditor
  )
}

Editor.propTypes = {
  uid: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    })
  }).isRequired
}
