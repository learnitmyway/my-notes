import React from 'react'
import PropTypes from 'prop-types'

import Note from '../Note/Note'
import Main from '../Main/Main'
import { readNote, updateNote } from '../../service/noteService/noteService'

import deviceWidths from '../../deviceWidths'

import './Container.css'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      note: {},
      isError: false
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
  }

  readNote () {
    const successCallback = (snapshot) => {
      const note = snapshot.val()

      if (note === null) {
        console.error('Not able to read note: ' + this.props.match.params.noteId)
        this.setState({isError: true})
      } else {
        this.setState({note})
      }
    }

    const failureCallback = (err) => {
      console.error(err)
      this.setState({isError: true})
    }

    readNote(this.props.uid, this.props.match.params.noteId, successCallback, failureCallback)
  }

  handleBodyChange (body) {
    const note = {...this.state.note, body}
    this.setState({note})

    updateNote(this.props.uid, this.props.match.params.noteId, note)
  }

  handleTitleChange (title) {
    const note = {...this.state.note, title}
    this.setState({note})

    updateNote(this.props.uid, this.props.match.params.noteId, note)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.readNote()
    }
  }

  componentDidMount () {
    if (this.props.match.params && this.props.match.params.noteId) {
      this.readNote()
    }
  }

  render () {
    const small = window.innerWidth < deviceWidths.small
    const currentNote = this.state.note ? {id: this.props.match.params.noteId, ...this.state.note} : {}
    const containerClasses = small ? 'Container' : 'Container Container--not-small'
    const noteClasses = small ? undefined : 'Note--not-small'

    return (
      <div className={containerClasses}>
        {small ? null : <Main classNames='Main--not-small' currentNote={currentNote} uid={this.props.uid} match={this.props.match} />}
        <Note classNames={noteClasses} isError={this.state.isError} note={this.state.note} onBodyChange={this.handleBodyChange} onTitleChange={this.handleTitleChange} />
      </div>
    )
  }
}

Container.propTypes = {
  uid: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  }).isRequired
}
