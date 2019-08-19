import React, { Component } from 'react'

import Routes from './Routes'
import { signInAnonymously } from './authService'
import { logError } from '../logService'
import { ThemeContext } from './Context'

export interface State {
  uid: string
  hasError: boolean
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { uid: '', hasError: false }
  }

  componentDidMount() {
    signInAnonymously()
      .then(userCredentials => {
        if (userCredentials.user) {
          this.setState({
            uid: userCredentials.user.uid
          })
        } else {
          logError({ description: 'Could not parse uid from user credentials' })
        }
      })
      .catch(err => {
        this.setState({ hasError: true })
        logError({ error: err, description: 'Sign in failed' })
      })
  }

  static contextType = ThemeContext

  render() {
    document.documentElement.style.setProperty('--primary', this.context)
    const { uid, hasError } = this.state
    if (hasError) {
      return <p> Sign in failed. Please refresh the page and try again.</p>
    } else {
      return uid ? <Routes {...this.props} uid={uid} /> : null
    }
  }
}
