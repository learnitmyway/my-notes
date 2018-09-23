import React, { Component } from 'react'
import uuidv1 from 'uuid/v1'

import { signInAnonymously } from './authService'
import { createNote } from './noteService'

import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      uid: null
    }
  }

  createNote (noteId) {
    createNote(this.state.uid, noteId)
  }

  componentDidMount () {
    signInAnonymously()
      .then(userCredentials => {
        this.setState({
          uid: userCredentials.user.uid
        })
      })
      .catch(err => {
        console.error(err)
        window.alert('Something went wrong. Please refresh the page and try again.')
      })
  }

  render () {
    const noteId = uuidv1()
    return (
      <div className='App'>
        {this.state.uid && <button onClick={() => this.createNote(noteId)}>Create note</button>}
      </div>
    )
  }
}

export default App
