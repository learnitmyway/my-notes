/* eslint-env jest */

import firebase from 'firebase/app'

import { createNote } from './noteService'

describe('noteService', () => {
  it('creates a note in the firebase database', () => {
    const set = jest.fn()

    const ref = jest.fn(() => {
      return {
        set
      }
    })

    jest.spyOn(firebase, 'database').mockImplementation(() => {
      return {
        ref
      }
    })

    const uid = 'uid'
    const noteId = 'noteId'
    createNote(uid, noteId)

    const newNote = {title: 'untitled', body: ''}

    expect(ref).toHaveBeenCalledWith(`/notes/${uid}/${noteId}`)
    expect(set).toHaveBeenCalledWith(newNote)
  })
})
