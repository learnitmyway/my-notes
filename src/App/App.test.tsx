import React from 'react'
import { fireEvent, waitForElement } from 'react-testing-library'
import uuidv1 from 'uuid/v1'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import { signInAnonymously } from '../authService/authService'
import { createNote, readNote } from '../noteService/noteService'
import App from './App'

jest.mock('uuid/v1')
jest.mock('../noteService/noteService')
jest.mock('../authService/authService')

describe('App', () => {
  it('creates a new note with title and body and navigates to it', async () => {
    const expectedNoteId = 'noteId'
    uuidv1.mockReturnValue(expectedNoteId)

    const expectedUid = '42'
    const userCredential = {
      user: {
        uid: expectedUid
      }
    }

    signInAnonymously.mockReturnValue(Promise.resolve(userCredential))

    const expectedTitle = 'title'
    const expectedBody = 'body'
    const snapshot = {
      val() {
        return { title: expectedTitle, body: expectedBody }
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const { history, getByTestId } = await renderWithRouter(<App />)

    fireEvent.click(getByTestId('CreateNote__btn'))

    expect(createNote).toHaveBeenCalledWith(expectedUid, expectedNoteId)
    expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
    expect(getByTestId('Note__title').value).toBe(expectedTitle)
    expect(getByTestId('Note__body').value).toBe(expectedBody)
  })
})
