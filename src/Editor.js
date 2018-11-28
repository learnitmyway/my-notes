import React from 'react'
import PropTypes from 'prop-types'

import Note from './Note'

export default function Editor (props) {
  return (
    <Note {...props} />
  )
}

Editor.propTypes = {
  uid: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  })
}
