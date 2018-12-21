import React from 'react'
import PropTypes from 'prop-types'

import Note from '../Note/Note'
import Main from '../Main/Main'
import { readNote } from '../../service/noteService/noteService'

import deviceWidths from '../../deviceWidths'

import './Container.css'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentNote: null
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  readNote () {
    const successCallback = (snapshot) => {
      const note = snapshot.val()
      this.setState({note})
    }

    readNote(this.props.uid, this.props.match.params.noteId, successCallback)
  }

  handleTitleChange (currentNote) {
    this.setState({currentNote})
  }

  componentDidMount () {
    if (this.props.match.params && this.props.match.params.noteId) {
      this.readNote()
    }
  }

  render () {
    const currentNote = this.state.currentNote ? this.state.currentNote : {}
    const largerScreenContainer = (
      <div className='Container Container--not-small'>
        <Main classNames='Main--not-small' currentNote={currentNote} uid={this.props.uid} match={this.props.match} />
        <Note classNames='Note--not-small' note={this.state.note} onTitleChange={this.handleTitleChange} {...this.props} />
      </div>
    )
    return (
      window.innerWidth < deviceWidths.small
        ? <Note note={this.state.note} onTitleChange={() => {}} {...this.props} />
        : largerScreenContainer
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
