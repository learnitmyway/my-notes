import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Main from '../Main/Main'
import Container from '../Container/Container'
import ExampleBoundary from '../ExampleBoundary'
import { signInAnonymously } from '../authService/authService'

import deviceWidths from '../deviceWidths'

class App extends Component {
  constructor() {
    super()
    this.state = {}

    this.renderRootPath = this.renderRootPath.bind(this)
  }

  componentDidMount() {
    signInAnonymously()
      .then(userCredentials => {
        this.setState({
          uid: userCredentials.user.uid
        })
      })
      .catch(err => {
        console.error(err)
        window.alert(
          'Something went wrong. Please refresh the page and try again.'
        )
      })
  }

  renderRootPath(props) {
    return window.innerWidth < deviceWidths.small ? (
      <Main uid={this.state.uid} />
    ) : (
      <Container {...props} uid={this.state.uid} />
    )
  }

  render() {
    return this.state.uid ? (
      <>
        <ExampleBoundary>
          <Route exact path="/" render={this.renderRootPath} />
          <Route
            exact
            path="/:noteId"
            render={props => <Container {...props} uid={this.state.uid} />}
          />
        </ExampleBoundary>
      </>
    ) : null
  }
}

export default App
