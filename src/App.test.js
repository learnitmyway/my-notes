/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from './App'
import { signInAnonymously } from './authService'

jest.mock('./authService')

configure({ adapter: new Adapter() })

describe('App', () => {
  it('Sets anonymous uid on mount', async () => {
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

  it('Logs error and displays an alert when anonymous sign in fails', async () => {
    window.alert = jest.fn()
    console.error = jest.fn()
    const err = new Error('Something bad happened')
    signInAnonymously.mockReturnValue(Promise.reject(err))

    const wrapper = await shallow(<App />)
    await wrapper.update()

    expect(console.error).toHaveBeenCalledWith(err)
    expect(window.alert).toHaveBeenCalledWith('Something went wrong. Please refresh the page and try again.')
  })
})
