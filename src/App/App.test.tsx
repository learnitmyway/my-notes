import React from 'react'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import App from './App'

import { logError } from '../logService'
import { signInAnonymously } from './authService'
import { waitForElement, wait, waitForDomChange } from '@testing-library/react'

jest.mock('./authService')
jest.mock('../logService')
jest.mock('../Container/Container', () => ({
  __esModule: true,
  default: function Container() {
    return <div />
  }
}))

const signInAnonymouslyMock = signInAnonymously as jest.Mock

const ERROR_MESSAGE = 'Sign in failed. Please refresh the page and try again.'

describe('App', () => {
  beforeEach(() => {
    const userCredential = {
      user: {
        uid: 'uid'
      }
    }
    signInAnonymouslyMock.mockReturnValue(Promise.resolve(userCredential))
  })

  it('logs and displays error when anonymous sign in fails', async () => {
    const err = new Error('Something bad happened')
    signInAnonymouslyMock.mockRejectedValue(err)

    const { getByText } = renderWithRouter(<App />)

    await waitForElement(() => getByText(ERROR_MESSAGE))

    expect(logError).toHaveBeenCalledWith({
      description: 'Sign in failed',
      error: err
    })
  })

  it('renders children when there is a uid', async () => {
    const { container } = renderWithRouter(<App />)

    await waitForDomChange()

    expect(container.firstChild).not.toBeNull()
  })

  it('does not render children when there is no uid', async () => {
    signInAnonymouslyMock.mockReturnValue(Promise.resolve({}))

    const { container } = renderWithRouter(<App />)

    await wait()

    expect(container.firstChild).toBeNull()
  })

  it('does not display error by default', async () => {
    const { queryByText } = renderWithRouter(<App />)

    await waitForDomChange()

    expect(queryByText(ERROR_MESSAGE)).toBeNull()
  })
})
