import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Main from './Main'
import { signInAnonymously } from './authService'

import './App.css'

function Note (props) {
  return <div>{props.uid}</div>
}

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
        {this.state.uid &&
          <div>
            <Route exact path='/' render={() => <Main uid={this.state.uid} />} />
            <Route exact path='/:noteId' render={(props) => <Note uid={this.state.uid} />} />
          </div>
        }
      </div>
    )
  }
}

export default App
