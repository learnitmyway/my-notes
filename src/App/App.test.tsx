import React from 'react'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import App from './App'

import { logError } from '../logService'
import { signInAnonymously } from './authService'
import { waitForElement } from 'react-testing-library'

jest.mock('./authService')
jest.mock('../logService')

const ERROR_MESSAGE = 'Sign in failed. Please refresh the page and try again.'

describe('App', () => {
  beforeEach(() => {
    const userCredential = {
      user: {
        uid: 'uid'
      }
    }
    signInAnonymously.mockReturnValue(Promise.resolve(userCredential))
  })

  it('logs and displays error when anonymous sign in fails', async () => {
    const err = new Error('Something bad happened')
    signInAnonymously.mockReturnValue(Promise.reject(err))

    const { getByText } = await await renderWithRouter(<App />)

    expect(logError).toHaveBeenCalledWith({
      description: 'Sign in failed',
      error: err
    })

    await waitForElement(() => getByText(ERROR_MESSAGE))
  })

  it('renders children when there is a uid', async () => {
    const { container } = await renderWithRouter(<App />)

    expect(container.firstChild).not.toBeNull()
  })

  it('does not render children when there is no uid', async () => {
    signInAnonymously.mockReturnValue(Promise.resolve({}))

    const { container } = await renderWithRouter(<App />)

    expect(container.firstChild).toBeNull()
  })

  it('does not display error by default', async () => {
    const { queryByText } = await renderWithRouter(<App />)

    expect(queryByText(ERROR_MESSAGE)).toBeNull()
  })
})
