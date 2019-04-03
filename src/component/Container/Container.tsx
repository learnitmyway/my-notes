import React from 'react'

import Note from '../Note/Note'
import Main from '../Main/Main'

import deviceWidths from '../../deviceWidths'
import CurrentNote from '../../CurrentNote'

import './Container.css'
import noteStyles from '../Note/Note.module.css'

export interface Props {
  uid: string
  match: any
}

interface State {
  currentNote: CurrentNote
}

export default class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentNote: { id: '', title: '' }
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  handleTitleChange(currentNote: CurrentNote) {
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
