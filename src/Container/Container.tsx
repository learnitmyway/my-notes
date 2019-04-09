import classNames from 'classnames'
import React from 'react'

import Note from '../Note/Note'
import Sidebar from '../Sidebar/Sidebar'

import deviceWidths from '../deviceWidths'
import NoteTO from '../NoteTO'

import noteStyles from '../Note/Note.module.css'
import styles from './Container.module.css'
import NavigationBar from './NavigationBar'

export interface Props {
  history: any
  uid: string
  match: any
}

interface State {
  currentNote: NoteTO
  sidebarIsOpen: boolean
}

export default class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentNote: { id: '', title: '' },
      sidebarIsOpen: true
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.setState({ sidebarIsOpen: false })
    }
  }

  render() {
    const { currentNote, sidebarIsOpen } = this.state
    const { history, match, uid } = this.props

    const small = window.innerWidth < deviceWidths.small

    return (
      <>
        {small && <NavigationBar handleClick={this.handleHamburgerClick} />}
        <div className={classNames(styles.root, !small && styles.notSmall)}>
          <Sidebar
            small={small}
            open={sidebarIsOpen}
            currentNote={currentNote}
            uid={uid}
            match={match}
          />
          <Note
            classNames={classNames(!small && noteStyles.notSmall)}
            history={history}
            onTitleChange={this.handleTitleChange}
            uid={uid}
            match={match}
          />
        </div>
      </>
    )
  }

  private handleTitleChange(currentNote: NoteTO) {
    this.setState({ currentNote })
  }

  private handleHamburgerClick = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen })
  }
}
