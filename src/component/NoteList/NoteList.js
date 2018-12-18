import React from 'react'
import PropTypes from 'prop-types'

import NoteListItem from './NoteListItem/NoteListItem'
import { readAllNotes } from '../../service/noteService/noteService'

export default class NoteList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const successCallback = (snapshot) => {
      const notes = snapshot.val()

      this.setState({
        notes: notes
      })
    }

    readAllNotes(this.props.uid, successCallback)
  }

  render () {
    return (
      <React.Fragment>
        {this.state.notes &&
          Object.entries(this.state.notes).map(noteEntry =>
            <NoteListItem key={noteEntry[0]} title={noteEntry[1].title} />)
        }
      </React.Fragment>
    )
  }
}

NoteList.propTypes = {
  uid: PropTypes.string.isRequired
}
