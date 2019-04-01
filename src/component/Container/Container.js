import React from 'react'
import PropTypes from 'prop-types'

import Note from '../Note/Note'
import Main from '../Main/Main'

import deviceWidths from '../../deviceWidths'

import './Container.css'
import noteStyles from '../Note/Note.module.css'

export default class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentNote: { id: null, title: null }
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  handleTitleChange(currentNote) {
    this.setState({ currentNote })
  }

  render() {
    const small = window.innerWidth < deviceWidths.small
    const containerClasses = small
      ? 'Container'
      : 'Container Container--not-small'
    const noteClasses = small ? undefined : noteStyles.notSmall

    return (
      <div className={containerClasses}>
        {small ? null : (
          <Main
            classNames="Main--not-small"
            currentNote={this.state.currentNote}
            uid={this.props.uid}
            match={this.props.match}
          />
        )}
        <Note
          classNames={noteClasses}
          onTitleChange={this.handleTitleChange}
          uid={this.props.uid}
          match={this.props.match}
        />
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
