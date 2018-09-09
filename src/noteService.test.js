/* eslint-env jest */

import firebase from 'firebase/app'

import { createNote } from './noteService'

describe('noteService', () => {
  it('creates a note in the firebase database', () => {
    const set = jest.fn()

    const push = jest.fn(() => {
      return {
        set
      }
    })

    const ref = jest.fn(() => {
      return {
        push
      }
    })

    jest.spyOn(firebase, 'database').mockImplementation(() => {
      return {
        ref
      }
    })

    const uid = '42'
    createNote(uid)

    const newNote = {title: 'untitled', body: ''}

    expect(ref).toHaveBeenCalledWith(`/notes/${uid}/`)
    expect(push).toHaveBeenCalled()
    expect(set).toHaveBeenCalledWith(newNote)
  })
})
