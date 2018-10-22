import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { readNote } from './noteService'

export default class Note extends Component {
  componentDidMount () {
    readNote(this.props.uid, this.props.match.params.noteId, (snapshot) => {
      const note = snapshot.val()
      this.setState({
        title: note.title,
        body: note.body
      })
    })
  }

  render () {
    return <div>{this.props.uid}</div>
  }
}

Note.propTypes = {
  uid: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  })
}
