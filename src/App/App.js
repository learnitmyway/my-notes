import React, { Component } from 'react'

import Routes from './Routes'
import { signInAnonymously } from './authService'
import { logError } from '../logService'

export default class App extends Component {
  constructor() {
    super()
    this.state = { uid: '' }
  }

  componentDidMount() {
    signInAnonymously()
      .then(userCredentials => {
        this.setState({
          uid: userCredentials.user.uid
        })
      })
      .catch(err => {
        logError('Sign in failed', err)
        window.alert(
          'Something went wrong. Please refresh the page and try again.'
        )
      })
  }

  render() {
    const { uid } = this.state
    return uid ? <Routes {...this.props} uid={uid} /> : null
  }
}
