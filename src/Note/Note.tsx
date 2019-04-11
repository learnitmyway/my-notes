import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import moment from 'moment'

import { logError } from '../logService'
import { deleteNote, readNote, updateNote } from '../noteService/noteService'
import NoteListItemTO from '../NoteListItemTO'

import styles from './Note.module.css'

export interface Props {
  classNames?: string
  history: {
    push: (path: string) => void
  }
  match: {
    params: {
      noteId: string
    }
  }
  onTitleChange: (currentNote: NoteListItemTO) => void
  uid: string
}

interface NoteTO {
  title: string
  body: string
  lastModified: number
}

interface State {
  note: NoteTO | null
  isError: boolean
}

export default class Note extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      note: null,
      isError: false
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
  }

  renderErrorMessage() {
    this.setState({
      note: null,
      isError: true
    })
  }

  readNote() {
    const successCallback = (snapshot: any) => {
      const note = snapshot.val()

      if (note === null) {
        logError('Not able to read note: ' + this.props.match.params.noteId)
        this.renderErrorMessage()
      } else {
        this.setState({
          note,
          isError: false
        })
      }
    }

    const failureCallback = (err: any) => {
      logError('Read note failed', err)
      this.renderErrorMessage()
    }

    readNote(
      this.props.uid,
      this.props.match.params.noteId,
      successCallback,
      failureCallback
    )
  }

  handleTitleChange(e: any) {
    const note = this.state.note
    const body = note!.body
    const lastModified = note!.lastModified
    const { onTitleChange, uid, match } = this.props

    this.setState({ note: { title: e.target.value, body, lastModified } })

    const currentNote = {
      id: match.params.noteId,
      title: e.target.value
    }
    onTitleChange(currentNote)
    updateNote(uid, match.params.noteId, e.target.value, body)
  }

  handleBodyChange(e: any) {
    const note = this.state.note
    const title = note!.title
    const lastModified = note!.lastModified
    const { uid, match } = this.props
    this.setState({ note: { title, body: e.target.value, lastModified } })
    updateNote(uid, match.params.noteId, title, e.target.value)
  }

  handleClick = () => {
    const { history, match, uid } = this.props
    deleteNote(uid, match.params.noteId)
      .then(() => history.push('/'))
      .catch(err => logError('Delete note failed', err))
  }

  componentDidUpdate(prevProps: Props, prevState: any, snapshot: any) {
    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.readNote()
    }
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.noteId) {
      this.readNote()
    }
  }

  render() {
    let classNames = styles.Note
    if (this.props.classNames) {
      classNames += ' ' + this.props.classNames
    }

    const note = this.state.note

    return (
      <div data-testid="Note" className={classNames}>
        {note && (
          <>
            <div className={styles.titleBar}>
              <time className={styles.date}>
                {moment(note!.lastModified).format('LL')}
              </time>
              <button className={styles.deleteBtn} onClick={this.handleClick}>
                Delete
              </button>
            </div>
            <ContentEditable
              className={styles.title}
              data-testid={'Note__title'}
              html={note!.title || ''}
              onChange={this.handleTitleChange}
            />
            <ContentEditable
              className={styles.body}
              data-testid={'Note__body'}
              html={note!.body || ''}
              onChange={this.handleBodyChange}
            />
          </>
        )}
        {this.state.isError && (
          <div data-testid="Note__error" className={styles.error}>
            Note cannot be found
          </div>
        )}
      </div>
    )
  }
}
