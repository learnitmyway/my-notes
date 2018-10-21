/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import { signInAnonymously } from './authService'

jest.mock('./authService')
jest.mock('./noteService')

describe('App', () => {
  it('sets anonymous uid on mount', async () => {
    const expectedUid = 42
    const userCredential = {
      user: {
        uid: expectedUid
      }
    }

    signInAnonymously.mockReturnValue(Promise.resolve(userCredential))

    const wrapper = await shallow(<App />)

    expect(wrapper.state().uid).toBe(expectedUid)
  })

  it('logs error and displays an alert when anonymous sign in fails', async () => {
    window.alert = jest.fn()
    console.error = jest.fn()
    const err = new Error('Something bad happened')
    signInAnonymously.mockReturnValue(Promise.reject(err))

    const wrapper = await shallow(<App />)
    await wrapper.update()

    expect(console.error).toHaveBeenCalledWith(err)
    expect(window.alert).toHaveBeenCalledWith('Something went wrong. Please refresh the page and try again.')
  })

  it('does not render children when there is no uid', () => {
    signInAnonymously.mockReturnValue(Promise.resolve())

    const wrapper = shallow(<App />)
    wrapper.setState({uid: null})

    expect(wrapper.find('.App').props().children).toBeNull()
  })

  it('renders children when there is a uid', () => {
    signInAnonymously.mockReturnValue(Promise.resolve())

    const wrapper = shallow(<App />)
    wrapper.setState({uid: 'uid'})

    expect(wrapper.find('.App').props().children).not.toBeNull()
  })
})
