import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { readNote } from './noteService'

export default class Note extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
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
    return (
      <React.Fragment>
        <div className='Note-title'>{this.state.title}</div>
        <div className='Note-body'>{this.state.body}</div>
      </React.Fragment>
    )
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
