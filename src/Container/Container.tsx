import React from 'react'

import Note from '../Note/Note'
import Sidebar from '../Sidebar/Sidebar'

import CurrentNote from '../CurrentNote'
import deviceWidths from '../deviceWidths'

import noteStyles from '../Note/Note.module.css'
import styles from './Container.module.css'

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
      ? styles.container
      : styles.container + ' '  + styles.containerNotSmall
    const noteClasses = small ? undefined : noteStyles.notSmall

    return (
      <div className={containerClasses}>
        {small ? null : (
          <Sidebar
            classNames="Sidebar--not-small"
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
