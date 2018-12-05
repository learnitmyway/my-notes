/* eslint-env jest */

import firebase from 'firebase/app'

import { createNote, readNote } from './noteService'

describe('noteService', () => {
  it('creates a note in the firebase database', () => {
    const set = jest.fn(() => Promise.resolve())

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

    const newNote = {title: 'untitled', body: noteId}

    expect(ref).toHaveBeenCalledWith(`/notes/${uid}/${noteId}`)
    expect(set).toHaveBeenCalledWith(newNote)
  })

  it('handles error when creating a note', async () => {
    console.error = jest.fn()
    const err = new Error('Something bad happened')
    const set = jest.fn(() => Promise.reject(err))

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
    await createNote(uid, noteId)

    expect(console.error).toHaveBeenCalledWith(`Cannot create note: /notes/${uid}/${noteId}`, err)
  })

  it('reads a note from the firebase database', () => {
    const once = jest.fn()

    const ref = jest.fn(() => {
      return {
        once
      }
    })

    jest.spyOn(firebase, 'database').mockImplementation(() => {
      return {
        ref
      }
    })

    const uid = 'uid'
    const noteId = 'noteId'
    const successCallback = jest.fn()
    const failureCallback = jest.fn()

    readNote(uid, noteId, successCallback, failureCallback)

    expect(once).toHaveBeenCalledWith('value', successCallback, failureCallback)
  })
})
