import React from 'react'
import PropTypes from 'prop-types'

import NoteListItem from './NoteListItem/NoteListItem'
import { readAllNotes } from '../../service/noteService/noteService'

import './NoteList.css'

export default class NoteList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isError: false }
  }

  renderErrorMessage() {
    this.setState({ isError: true })
  }

  componentDidMount() {
    const successCallback = snapshot => {
      const notes = snapshot.val()

      this.setState({
        notes: notes
      })
    }

    const failureCallback = err => {
      console.error(err)
      this.renderErrorMessage()
    }

    readAllNotes(this.props.uid, successCallback, failureCallback)
  }

  render() {
    const noteIdInUrl = this.props.match && this.props.match.params.noteId
    const currentNoteId = this.props.currentNote && this.props.currentNote.id
    const currentNoteTitle =
      this.props.currentNote && this.props.currentNote.title
    return (
      <div className="NoteList">
        {this.state.notes &&
          Object.entries(this.state.notes).map(noteEntry => {
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
}

NoteList.propTypes = {
  currentNote: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  }),
  uid: PropTypes.string.isRequired
}
