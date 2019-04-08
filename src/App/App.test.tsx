import React from 'react'
import { fireEvent } from 'react-testing-library'
import uuidv1 from 'uuid/v1'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import App from './App'

import { signInAnonymously } from '../authService/authService'
import { createNote, readAllNotes, readNote } from '../noteService/noteService'

jest.mock('uuid/v1')
jest.mock('../noteService/noteService')
jest.mock('../authService/authService')

describe('App', () => {
  it('displays an alert when anonymous sign in fails', async () => {
    window.alert = jest.fn()
    const err = new Error('Something bad happened')
    signInAnonymously.mockReturnValue(Promise.reject(err))

    await await renderWithRouter(<App />)

    expect(window.alert).toHaveBeenCalledWith(
      'Something went wrong. Please refresh the page and try again.'
    )
  })

  it('does not render children when there is no uid', async () => {
    signInAnonymously.mockReturnValue(Promise.resolve({}))

    const { container } = await renderWithRouter(<App />)

    expect(container.firstChild).toBeNull()
  })

  describe('for small devices', () => {
    beforeEach(() => {
      window.innerWidth = 599
      const userCredential = {
        user: {
          uid: 'uid'
        }
      }
      signInAnonymously.mockReturnValue(Promise.resolve(userCredential))
    })

    describe('from /', () => {
      it('displays sidebar', async () => {
        const { queryByTestId } = await renderWithRouter(<App />)

        expect(queryByTestId('Sidebar')).not.toBeNull()
      })

      it('does not display container', async () => {
        const userCredential = {
          user: {
            uid: 'uid'
          }
        }
        signInAnonymously.mockReturnValue(Promise.resolve(userCredential))

        const { queryByTestId } = await renderWithRouter(<App />)

        expect(queryByTestId('Container')).toBeNull()
      })

      it('creates a new note and navigates to it', async () => {
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

        const { getByTestId, history } = await renderWithRouter(<App />)

        fireEvent.click(getByTestId('CreateNote__btn'))

        expect(createNote).toHaveBeenCalledWith(expectedUid, expectedNoteId)
        expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
        expect(getByTestId('Note__title').value).toBe(expectedTitle)
        expect(getByTestId('Note__body').value).toBe(expectedBody)
      })

      it('navigates to existing note', async () => {
        const expectedTitle = 'title'
        const expectedBody = 'body'
        const expectedNoteId = 'note2'
        const expectedNote = { title: expectedTitle, body: expectedBody }

        const notes = {
          note1: {},
          [expectedNoteId]: expectedNote,
          note3: {}
        }
        const readAllSnapshot = {
          val() {
            return notes
          }
        }
        readAllNotes.mockImplementation((uid, cb) => {
          cb(readAllSnapshot)
        })

        const snapshot = {
          val() {
            return expectedNote
          }
        }
        readNote.mockImplementation((uid, noteId, cb) => {
          cb(snapshot)
        })

        const { getByText, getByTestId, history } = await renderWithRouter(
          <App />
        )

        fireEvent.click(getByText(expectedTitle))

        expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
        expect(getByTestId('Note__title').value).toBe(expectedTitle)
      })
    })

    describe('from /:noteId', () => {
      it('creates a new note and navigates to it', async () => {
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

        const { getByAltText, getByTestId, history } = await renderWithRouter(
          <App />,
          { route: '/anotherNoteId' }
        )

        fireEvent.click(getByAltText('hamburger menu'))
        fireEvent.click(getByTestId('CreateNote__btn'))

        expect(createNote).toHaveBeenCalledWith(expectedUid, expectedNoteId)
        expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
        expect(getByTestId('Note__title').value).toBe(expectedTitle)
        expect(getByTestId('Note__body').value).toBe(expectedBody)
      })

      it('navigates to existing note', async () => {
        const expectedTitle = 'title'
        const expectedBody = 'body'
        const expectedNoteId = 'note2'
        const expectedNote = { title: expectedTitle, body: expectedBody }

        const notes = {
          note1: {},
          [expectedNoteId]: expectedNote,
          note3: {}
        }
        const readAllSnapshot = {
          val() {
            return notes
          }
        }
        readAllNotes.mockImplementation((uid, cb) => {
          cb(readAllSnapshot)
        })

        const snapshot = {
          val() {
            return expectedNote
          }
        }
        readNote.mockImplementation((uid, noteId, cb) => {
          cb(snapshot)
        })

        const {
          getByText,
          getByTestId,
          history,
          getByAltText
        } = await renderWithRouter(<App />, { route: '/anotherNoteId' })

        fireEvent.click(getByAltText('hamburger menu'))
        fireEvent.click(getByText(expectedTitle))

        expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
        expect(getByTestId('Note__title').value).toBe(expectedTitle)
      })
    })
  })

  describe('for non-small devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })

    describe('from /', () => {
      it('creates a new note and navigates to it', async () => {
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
  })
})
