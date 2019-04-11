import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App/App'
import ErrorBoundary from './ErrorBoundary'

import { unregister } from './registerServiceWorker'

import 'normalize.css'
import './index.css'

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement
)
unregister()
