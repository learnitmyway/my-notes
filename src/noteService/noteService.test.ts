import firebase from 'firebase/app'

import { log } from '../errorService'
import {
  createNote,
  deleteNote,
  readAllNotes,
  readNote,
  updateNote
} from './noteService'

jest.mock('../errorService')

const TIMESTAMP = 1554907683672

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
    firebase.database.ServerValue = { TIMESTAMP }

    const uid = 'uid'
    const noteId = 'noteId'
    createNote(uid, noteId)

    expect(ref).toHaveBeenCalledWith(`/notes/${uid}/${noteId}`)
    expect(set).toHaveBeenCalledWith({
      title: '',
      body: '',
      lastModified: TIMESTAMP
    })
  })

  it('handles error when creating a note', async () => {
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
    firebase.database.ServerValue = { TIMESTAMP }

    const uid = 'uid'
    const noteId = 'noteId'
    await createNote(uid, noteId)

    expect(log).toHaveBeenCalledWith(
      `Cannot create note: /notes/${uid}/${noteId}`,
      err
    )
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
    firebase.database.ServerValue = { TIMESTAMP }

    const uid = 'uid'
    const noteId = 'noteId'
    const successCallback = jest.fn()
    const failureCallback = jest.fn()

    readNote(uid, noteId, successCallback, failureCallback)

    expect(once).toHaveBeenCalledWith('value', successCallback, failureCallback)
  })

  it('reads all notes from the firebase database', () => {
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
    firebase.database.ServerValue = { TIMESTAMP }

    const uid = 'uid'
    const successCallback = jest.fn()
    const failureCallback = jest.fn()

    readAllNotes(uid, successCallback, failureCallback)

    expect(once).toHaveBeenCalledWith('value', successCallback, failureCallback)
    expect(ref).toHaveBeenCalledWith(`/notes/${uid}`)
  })

  it('updates a note in the firebase database', () => {
    const update = jest.fn(() => Promise.resolve())

    const ref = jest.fn(() => {
      return {
        update
      }
    })

    jest.spyOn(firebase, 'database').mockImplementation(() => {
      return {
        ref
      }
    })
    firebase.database.ServerValue = { TIMESTAMP }

    const uid = 'uid'
    const noteId = 'noteId'
    const title = 'An awesome title'
    const body = 'An awesome body'
    updateNote(uid, noteId, title, body)

    const updatedNote = { title, body, lastModified: TIMESTAMP }

    expect(ref).toHaveBeenCalledWith(`/notes/${uid}/${noteId}`)
    expect(update).toHaveBeenCalledWith(updatedNote)
  })

  it('deletes a note in the firebase database', () => {
    const remove = jest.fn(() => Promise.resolve())

    const ref = jest.fn(() => {
      return {
        remove
      }
    })
    jest.spyOn(firebase, 'database').mockImplementation(() => {
      return {
        ref
      }
    })

    const uid = 'uid'
    const noteId = 'noteId'
    deleteNote(uid, noteId)

    expect(ref).toHaveBeenCalledWith(`/notes/${uid}/${noteId}`)
    expect(remove).toHaveBeenCalled()
  })
})
