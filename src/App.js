import React, { Component } from 'react'

import { signInAnonymously } from './authService'
import { createNote } from './noteService'

import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      uid: null
    }

    this.createNote = this.createNote.bind(this)
  }

  createNote () {
    createNote(this.state.uid)
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
    return (
      <div className='App'>
        <button onClick={this.createNote}>Create note</button>
      </div>
    )
  }
}

export default App
