import React from 'react'
import PropTypes from 'prop-types'

import NoteListItem from './NoteListItem/NoteListItem'
import { readAllNotes } from '../../service/noteService/noteService'

import './NoteList.css'

export default class NoteList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isError: false}
  }

  renderErrorMessage () {
    this.setState({isError: true})
  }

  componentDidMount () {
    const successCallback = (snapshot) => {
      const notes = snapshot.val()

      this.setState({
        notes: notes
      })
    }

    const failureCallback = (err) => {
      console.error(err)
      this.renderErrorMessage()
    }

    readAllNotes(this.props.uid, successCallback, failureCallback)
  }

  render () {
    return (
      <React.Fragment>
        {this.state.notes &&
          Object.entries(this.state.notes).map(noteEntry => {
            const noteId = noteEntry[0]
            const noteTitle = noteEntry[1].title
            return <NoteListItem key={noteId} title={noteTitle} noteId={noteId} />
          })
        }
        {this.state.isError && <div className='NoteList-error'>Notes cannot be found</div>}
      </React.Fragment>
    )
  }
}

NoteList.propTypes = {
  uid: PropTypes.string.isRequired
}
