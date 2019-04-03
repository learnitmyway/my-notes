import React from 'react'

import Main from '../Main/Main'
import Note from '../Note/Note'

import CurrentNote from '../CurrentNote'
import deviceWidths from '../deviceWidths'

import noteStyles from '../Note/Note.module.css'
import './Container.css'

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

  public handleTitleChange(currentNote: CurrentNote) {
    this.setState({ currentNote })
  }

  public render() {
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
