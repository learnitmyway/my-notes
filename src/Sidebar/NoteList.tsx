import React from 'react'
import { Redirect } from 'react-router-dom'

import NoteListItem from './NoteListItem'

import { log } from '../errorService'
import { readAllNotes } from '../noteService/noteService'
import NoteTO from '../NoteTO'

import './NoteList.css'

export interface Props {
  uid: string
  currentNote?: NoteTO
  match: any
}

interface State {
  notes: any[]
  firstNoteId?: string
  isError: boolean
}

export default class NoteList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { notes: [], isError: false }
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.match || !prevProps.match) {
      return
    }

    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.readAllNotes()
    }
  }

  componentDidMount() {
    this.readAllNotes()
  }

  render() {
    const { match, currentNote } = this.props
    const { notes, firstNoteId } = this.state

    const noteIdInUrl = match && match.params.noteId

    if (!noteIdInUrl && firstNoteId) {
      return <Redirect to={`/${firstNoteId}`} />
    }

    const currentNoteId = currentNote && currentNote.id
    const currentNoteTitle = currentNote && currentNote.title
    return (
      <div data-testid="NoteList" className="NoteList">
        {this.state.notes &&
          Object.entries(notes).map(noteEntry => {
            const noteId = noteEntry[0]
            const noteTitle =
              noteId === currentNoteId ? currentNoteTitle : noteEntry[1].title
            const isSelected = !!(noteIdInUrl && noteId === noteIdInUrl)
            return (
              <NoteListItem
                key={noteId}
                title={noteTitle}
                noteId={noteId}
                isSelected={isSelected}
              />
            )
          })}
        {this.state.isError && (
          <div className="NoteList-error">Notes cannot be found</div>
        )}
      </div>
    )
  }

  private readAllNotes() {
    const successCallback = (snapshot: any) => {
      const notes = snapshot.val()
      const firstNoteId = Object.keys(notes)[0]
      this.setState({ firstNoteId, isError: false, notes })
    }
    const failureCallback = (err: any) => {
      log('Cannot read all notes', err)
      this.setState({ firstNoteId: undefined, isError: true, notes: [] })
    }
    readAllNotes(this.props.uid, successCallback, failureCallback)
  }
}
