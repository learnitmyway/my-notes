import React from 'react'

import Note from '../Note/Note'
import Sidebar from '../Sidebar/Sidebar'

import CurrentNote from '../CurrentNote'
import deviceWidths from '../deviceWidths'

import NavigationBar from '../NavigationBar/NavigationBar'
import noteStyles from '../Note/Note.module.css'
import styles from './Container.module.css'

export interface Props {
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

  public handleTitleChange(currentNote: CurrentNote) {
    this.setState({ currentNote })
  }

  public render() {
    const small = window.innerWidth < deviceWidths.small
    const noteClasses = small ? undefined : noteStyles.notSmall

    const { currentNote, sidebarIsOpen } = this.state
    const { match, uid } = this.props
    return (
      <>
        <NavigationBar handleClick={this.handleHamburgerClick} />
        <div className={small ? styles.container : styles.containerNotSmall}>
          {sidebarIsOpen ? (
            <Sidebar
              classNames="Sidebar--not-small"
              currentNote={currentNote}
              uid={uid}
              match={match}
            />
          ) : null}
          <Note
            classNames={noteClasses}
            onTitleChange={this.handleTitleChange}
            uid={uid}
            match={match}
          />
        </div>
      </>
    )
  }

  private handleHamburgerClick = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen })
  }
}
