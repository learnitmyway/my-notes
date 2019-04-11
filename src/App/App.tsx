import React, { Component } from 'react'

import Routes from './Routes'
import { signInAnonymously } from './authService'
import { logError } from '../logService'

export interface State {
  uid: string
}

export default class App extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = { uid: '' }
  }

  componentDidMount() {
    signInAnonymously()
      .then(userCredentials => {
        if (userCredentials.user) {
          this.setState({
            uid: userCredentials.user.uid
          })
        } else {
          logError({ description: 'Could parse uid from user credentials' })
        }
      })
      .catch(err => {
        logError({ error: err, description: 'Sign in failed' })
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
