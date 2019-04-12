import classNames from 'classnames'
import React from 'react'

import CreateNote from './CreateNote'
import NoteList from './NoteList'

import deviceWidths from '../deviceWidths'
import NoteListItemTO from '../NoteListItemTO'

import leftArrow from './back.svg'
import rightArrow from './right-arrow.svg'
import styles from './Sidebar.module.css'

export interface Props {
  currentNote?: NoteListItemTO
  match: {
    params: {
      noteId: string
    }
  }
  uid: string
}

interface State {
  open: boolean
}

export default class Sidebar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: true
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.setState({ open: false })
    }
  }

  render() {
    const { currentNote, match, uid } = this.props
    const { open } = this.state
    const small = window.innerWidth < deviceWidths.small
    const className = classNames(
      styles.root,
      small ? styles.small : styles.notSmall,
      open ? styles.open : ''
    )
    return (
      <div data-testid="Sidebar" className={className}>
        {small && (
          <>
            <img
              onClick={this.handleClick}
              className={styles.leftArrow}
              src={leftArrow}
              alt="left arrow"
            />
            <img
              onClick={this.handleClick}
              className={styles.rightArrow}
              src={rightArrow}
              alt="right arrow"
            />
          </>
        )}
        <CreateNote uid={uid} />
        <NoteList uid={uid} match={match} currentNote={currentNote} />
      </div>
    )
  }
}
