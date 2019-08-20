import React, { Component } from 'react'

import Routes from './Routes'
import { signInAnonymously } from './authService'
import { logError } from '../logService'
import withThemeContext from './withThemeContext.js'

interface Props {
  themeContext: string
}

export interface State {
  uid: string
  hasError: boolean
}

class App extends Component<Props, State> {
  constructor(props: Props) {
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

  render() {
    document.documentElement.style.setProperty(
      '--primary',
      this.props.themeContext
    )
    const { uid, hasError } = this.state
    if (hasError) {
      return <p> Sign in failed. Please refresh the page and try again.</p>
    } else {
      return uid ? <Routes {...this.props} uid={uid} /> : null
    }
  }
}

export default withThemeContext(App)
