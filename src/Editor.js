import React from 'react'
import PropTypes from 'prop-types'

import Note from './Note'
import CreateNote from './CreateNote'

export default function Editor (props) {
  const largerScreenEditor = (
    <React.Fragment>
      <Note {...props} />
      <CreateNote uid={props.uid} />
    </React.Fragment>
  )
  return (
    window.innerWidth < 600
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
