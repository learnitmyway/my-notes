import React from 'react'
import PropTypes from 'prop-types'

import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

export default function Main (props) {
  return (
    <React.Fragment>
      <CreateNote uid={props.uid} />
      <NoteList uid={props.uid} />
    </React.Fragment>
  )
}

Main.propTypes = {
  uid: PropTypes.string.isRequired
}
