import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'

import { log } from '../errorService'
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
        log('Not able to read note: ' + this.props.match.params.noteId)
        this.renderErrorMessage()
      } else {
        this.setState({
          note,
          isError: false
        })
      }
    }

    const failureCallback = (err: any) => {
      log('Read note failed', err)
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
    const body = this.state.note!.body
    const { onTitleChange, uid, match } = this.props

    this.setState({ note: { title: e.target.value, body } })

    const currentNote = {
      id: match.params.noteId,
      title: e.target.value
    }
    onTitleChange(currentNote)
    updateNote(uid, match.params.noteId, e.target.value, body)
  }

  handleBodyChange(e: any) {
    const title = this.state.note!.title
    const { uid, match } = this.props
    this.setState({ note: { title, body: e.target.value } })
    updateNote(uid, match.params.noteId, title, e.target.value)
  }

  handleClick = () => {
    const { history, match, uid } = this.props
    deleteNote(uid, match.params.noteId)
      .then(() => history.push('/'))
      .catch(err => log('Delete note failed', err))
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

    const shouldRenderNote = this.state.note

    return (
      <div data-testid="Note" className={classNames}>
        {shouldRenderNote && (
          <>
            <div className={styles.titleWrapper}>
              <ContentEditable
                className={styles.title}
                data-testid={'Note__title'}
                html={this.state.note!.title || ''}
                onChange={this.handleTitleChange}
              />
              <button className={styles.deleteBtn} onClick={this.handleClick}>
                Delete
              </button>
            </div>
            <ContentEditable
              className={styles.body}
              data-testid={'Note__body'}
              html={this.state.note!.body || ''}
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
