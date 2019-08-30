import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App/App'
import ErrorBoundary from './common/ErrorBoundary/ErrorBoundary'

import { unregister } from './registerServiceWorker'

import 'normalize.css'
import './index.css'
import ThemeContextProvider from './Context/ThemeContextProvider'

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement
)
unregister()
