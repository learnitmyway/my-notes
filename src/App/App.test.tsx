import React from 'react'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import App from './App'

import { signInAnonymously } from '../authService/authService'
import { log } from '../errorService'

jest.mock('../authService/authService')
jest.mock('../errorService')

describe('App', () => {
  beforeEach(() => {
    const userCredential = {
      user: {
        uid: 'uid'
      }
    }
    signInAnonymously.mockReturnValue(Promise.resolve(userCredential))
  })

  it('logs error and displays an alert when anonymous sign in fails', async () => {
    window.alert = jest.fn()
    const err = new Error('Something bad happened')
    signInAnonymously.mockReturnValue(Promise.reject(err))

    await await renderWithRouter(<App />)

    expect(log).toHaveBeenCalledWith('Sign in failed', err)
    expect(window.alert).toHaveBeenCalledWith(
      'Something went wrong. Please refresh the page and try again.'
    )
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
})
