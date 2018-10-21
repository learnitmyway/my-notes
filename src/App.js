import React, { Component } from 'react'

import Main from './Main'
import { signInAnonymously } from './authService'

import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      uid: null
    }
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
        {this.state.uid && <Main uid={this.state.uid} />}
      </div>
    )
  }
}

export default App
