import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Main from '../Main/Main'
import Container from '../Container/Container'
import { signInAnonymously } from '../../service/authService/authService'

import deviceWidths from '../../deviceWidths'

import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {}

    this.renderRootPath = this.renderRootPath.bind(this)
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

  renderRootPath (props) {
    return window.innerWidth < deviceWidths.small
      ? <Main uid={this.state.uid} />
      : <Container {...props} uid={this.state.uid} />
  }

  render () {
    return (
      <div className='App'>
        {this.state.uid &&
          <React.Fragment>
            <Route exact path='/' render={this.renderRootPath} />
            <Route exact path='/:noteId' render={(props) => <Container {...props} uid={this.state.uid} />} />
          </React.Fragment>
        }
      </div>
    )
  }
}

export default App
