import React, { Component } from 'react'

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
  }

  render () {
    return (
      <div className='App' />
    )
  }
}

export default App
