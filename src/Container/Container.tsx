import React from 'react'

import Note from '../Note/Note'
import Sidebar from '../Sidebar/Sidebar'

import CurrentNote from '../CurrentNote'
import deviceWidths from '../deviceWidths'

import NavigationBar from '../NavigationBar/NavigationBar'
import noteStyles from '../Note/Note.module.css'
import styles from './Container.module.css'

export interface Props {
  history: any
  uid: string
  match: any
}

interface State {
  currentNote: CurrentNote
  sidebarIsOpen: boolean
}

export default class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const small = window.innerWidth < deviceWidths.small
    this.state = {
      currentNote: { id: '', title: '' },
      sidebarIsOpen: !small
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.setState({ sidebarIsOpen: false })
    }
  }

  public render() {
    const small = window.innerWidth < deviceWidths.small
    const noteClasses = small ? undefined : noteStyles.notSmall

    const { currentNote, sidebarIsOpen } = this.state
    const { history, match, uid } = this.props
    return (
      <>
        {window.innerWidth < deviceWidths.small && (
          <NavigationBar handleClick={this.handleHamburgerClick} />
        )}
        <div className={styles.root + ' ' + (small ? '' : styles.notSmall)}>
          <Sidebar
            small={small}
            open={sidebarIsOpen}
            currentNote={currentNote}
            uid={uid}
            match={match}
          />
          <Note
            classNames={noteClasses}
            history={history}
            onTitleChange={this.handleTitleChange}
            uid={uid}
            match={match}
          />
        </div>
      </>
    )
  }

  private handleTitleChange(currentNote: CurrentNote) {
    this.setState({ currentNote })
  }

  private handleHamburgerClick = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen })
  }
}
