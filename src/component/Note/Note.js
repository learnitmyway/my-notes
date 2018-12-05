import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { readNote } from '../../service/noteService/noteService'

import './Note.css'

export default class Note extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  readNote () {
    readNote(this.props.uid, this.props.match.params.noteId)
      .then((snapshot) => {
        const note = snapshot.val()
        this.setState({
          title: note.title,
          body: note.body
        })
      })
      .catch((err) => {
        console.error(err)
        this.setState({
          title: 'Note cannot be found',
          body: ''
        })
      })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.readNote()
    }
  }

  componentDidMount () {
    this.readNote()
  }

  render () {
    let classNames = 'Note '
    if (this.props.classNames) {
      classNames += this.props.classNames
    }

    return (
      <div className={classNames}>
        <div className='Note-title'>{this.state.title}</div>
        <div className='Note-body'>{this.state.body}</div>
      </div>
    )
  }
}

Note.propTypes = {
  uid: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    })
  }).isRequired,
  classNames: PropTypes.string
}
