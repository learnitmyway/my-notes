import React from 'react'
import PropTypes from 'prop-types'

import Note from '../Note/Note'
import Main from '../Main/Main'

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

  handleTitleChange (currentNote) {
    this.setState({currentNote})
  }

  render () {
    const small = window.innerWidth < deviceWidths.small
    const containerClasses = small ? 'Container' : 'Container Container--not-small'
    const noteClasses = small ? undefined : 'Note--not-small'
    const currentNote = this.state.currentNote ? this.state.currentNote : {}

    return (
      <div className={containerClasses}>
        {small ? null : <Main classNames='Main--not-small' currentNote={currentNote} uid={this.props.uid} match={this.props.match} />}
        <Note classNames={noteClasses} onTitleChange={this.handleTitleChange} uid={this.props.uid} match={this.props.match} />
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
