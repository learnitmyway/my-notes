import React from 'react'
import PropTypes from 'prop-types'

import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

import './Main.css'

export default function Main (props) {
  let classNames = ''
  if (props.classNames) {
    classNames += props.classNames
  }

  return (
    <div className={classNames}>
      <CreateNote uid={props.uid} />
      <NoteList uid={props.uid} />
    </div>
  )
}

Main.propTypes = {
  uid: PropTypes.string.isRequired,
  classNames: PropTypes.string
}
