import React from 'react'
import { render, waitForElement } from 'react-testing-library'

import ErrorBoundary from './ErrorBoundary'

function ErrorComponent() {
  throw new Error('temp')
}
const component = (
  <ErrorBoundary>
    <ErrorComponent />
  </ErrorBoundary>
)

describe('ErrorBoundary', () => {
  it('displays error message when there is an error', async () => {
    // tslint:disable no-console
    console.error = jest.fn()
    const { getByText } = render(component)

    await waitForElement(() =>
      getByText('Something went wrong. Please refresh the page and try again.')
    )
  })
})
