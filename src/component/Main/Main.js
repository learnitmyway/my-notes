import React from 'react'
import PropTypes from 'prop-types'

import CreateNote from '../CreateNote/CreateNote'

export default function Main (props) {
  return (
    <CreateNote uid={props.uid} />
  )
}

Main.propTypes = {
  uid: PropTypes.string.isRequired
}
