import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'

import CurrentNote from '../CurrentNote'
import { log } from '../errorService'
import { readNote, updateNote } from '../noteService/noteService'

import styles from './Note.module.css'

export interface Props {
  classNames?: string
  match: {
    params: {
      noteId: string
    }
  }
  onTitleChange: (currentNote: CurrentNote) => void
  uid: string
}

interface State {
  body: string | null
  isError: boolean
  title: string | null
}

export default class Note extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      body: null,
      isError: false,
      title: null
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
  }

  public renderErrorMessage() {
    this.setState({
      isError: true
    })
  }

  public readNote() {
    const successCallback = (snapshot: any) => {
      const note = snapshot.val()

      if (note === null) {
        log('Not able to read note: ' + this.props.match.params.noteId)
        this.renderErrorMessage()
      } else {
        this.setState({
          body: note.body,
          title: note.title
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

  public handleTitleChange(e: any) {
    this.setState({ title: e.target.value })
    const currentNote = {
      id: this.props.match.params.noteId,
      title: e.target.value
    }
    this.props.onTitleChange(currentNote)
    updateNote(
      this.props.uid,
      this.props.match.params.noteId,
      e.target.value,
      this.state.body || ''
    )
  }

  public handleBodyChange(e: any) {
    this.setState({ body: e.target.value })
    updateNote(
      this.props.uid,
      this.props.match.params.noteId,
      this.state.title || '',
      e.target.value
    )
  }

  public componentDidUpdate(prevProps: Props, prevState: any, snapshot: any) {
    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.readNote()
    }
  }

  public componentDidMount() {
    if (this.props.match.params && this.props.match.params.noteId) {
      this.readNote()
    }
  }

  public render() {
    let classNames = styles.Note
    if (this.props.classNames) {
      classNames += ' ' + this.props.classNames
    }

    const shouldRenderTitle = this.state.title || this.state.title === ''
    const shouldRenderBody = this.state.body || this.state.body === ''

    return (
      <div data-testid="Note" className={classNames}>
        {shouldRenderTitle && (
          <ContentEditable
            className={styles.title}
            data-testid={'Note__title'}
            html={this.state.title || ''}
            onChange={this.handleTitleChange}
          />
        )}
        {shouldRenderBody && (
          <ContentEditable
            className={styles.body}
            data-testid={'Note__body'}
            html={this.state.body || ''}
            onChange={this.handleBodyChange}
          />
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
