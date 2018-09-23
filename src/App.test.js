/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import uuidv1 from 'uuid/v1'

import App from './App'
import { signInAnonymously } from './authService'
import { createNote } from './noteService'

jest.mock('./authService')
jest.mock('./noteService')
jest.mock('uuid/v1')

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

  it('creates a new note when clicking the button', () => {
    signInAnonymously.mockReturnValue(Promise.resolve())
    const noteId = 'noteId'
    uuidv1.mockReturnValue(noteId)

    const wrapper = shallow(<App />)

    const uid = 'uid'
    wrapper.setState({uid})

    const button = wrapper.find('button')
    button.simulate('click')

    expect(createNote).toHaveBeenCalledWith(uid, noteId)
  })

  it('does not render children when there is no uid', () => {
    signInAnonymously.mockReturnValue(Promise.resolve())

    const wrapper = shallow(<App />)
    wrapper.setState({uid: null})

    expect(wrapper.find('button').length).toBe(0)
  })
})
