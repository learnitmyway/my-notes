import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import 'normalize.css'
import './index.css'

const config = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
