import React from 'react'
import { Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import { createMemoryHistory } from 'history'

export function renderWithRouter(ui) {
  const route = '/'
  const history = createMemoryHistory({ initialEntries: [route] })
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
}
