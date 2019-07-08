import classNames from 'classnames'
import React from 'react'
import { History } from 'history'

import Note from '../Note/Note'
import Sidebar from '../Sidebar/Sidebar'

import deviceWidths from '../deviceWidths'
import NoteListItemTO from '../NoteListItemTO'

import noteStyles from '../Note/Note.module.css'
import styles from './Container.module.css'

export interface Props {
  history: History
  uid: string
  match: {
    params: {
      noteId: string
    }
  }
}

interface State {
  currentNote: NoteListItemTO
}

export default class Container extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentNote: { id: '', title: '' }
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  render() {
    const { currentNote } = this.state
    const { history, match, uid } = this.props

    const small = window.innerWidth < deviceWidths.small

    return (
      <>
        <div className={classNames(styles.root, !small && styles.notSmall)}>
          <Sidebar currentNote={currentNote} uid={uid} match={match} />
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

  private handleTitleChange(currentNote: NoteListItemTO) {
    this.setState({ currentNote })
  }
}
