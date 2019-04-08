import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar'
import Container from '../Container/Container'
import { signInAnonymously } from '../authService/authService'

import deviceWidths from '../deviceWidths'

export default class App extends Component {
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
        window.alert(
          'Something went wrong. Please refresh the page and try again.'
        )
      })
  }

  renderRootPath(props) {
    return window.innerWidth < deviceWidths.small ? (
      <Sidebar open small uid={this.state.uid} />
    ) : (
      <Container {...props} uid={this.state.uid} />
    )
  }

  render() {
    const { uid } = this.state
    return uid ? (
      <>
        <Route exact path="/" render={this.renderRootPath} />
        <Route
          exact
          path="/:noteId"
          render={props => <Container {...props} uid={uid} />}
        />
      </>
    ) : null
  }
}
