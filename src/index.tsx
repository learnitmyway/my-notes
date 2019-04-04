import * as Sentry from '@sentry/browser';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App/App'
import { unregister } from './registerServiceWorker'

import 'normalize.css'
import './index.css'

Sentry.init({ dsn: 'https://4a64214ebae043ef85a91db67ea520fb@sentry.io/1430547' });

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)
unregister()
