import React from 'react'

import NoteListItem from './NoteListItem/NoteListItem'

import CurrentNote from '../CurrentNote'
import { readAllNotes } from '../noteService/noteService'

import './NoteList.css'

export interface Props {
  uid: string
  currentNote?: CurrentNote
  match: any
}

interface State {
  notes: any[]
  isError: boolean
}

export default class NoteList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { notes: [], isError: false }
  }

  public componentDidUpdate(prevProps: Props) {
    if (!this.props.match || !prevProps.match) {
      return
    }

    if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.readAllNotes()
    }
  }

  public componentDidMount() {
    this.readAllNotes()
  }

  public render() {
    const { match, currentNote } = this.props
    const { notes } = this.state
    const noteIdInUrl = match && match.params.noteId
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
      this.setState({
        notes
      })
    }
    const failureCallback = () => {
      this.setState({ isError: true })
    }
    readAllNotes(this.props.uid, successCallback, failureCallback)
  }
}
