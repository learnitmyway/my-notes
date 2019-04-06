import React from 'react'
import { fireEvent } from 'react-testing-library'
import uuidv1 from 'uuid/v1'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import sidebarStyles from '../Sidebar/Sidebar.module.css'
import App from './App'

import { signInAnonymously } from '../authService/authService'
import { createNote, readNote } from '../noteService/noteService'

jest.mock('uuid/v1')
jest.mock('../noteService/noteService')
jest.mock('../authService/authService')

describe('App', () => {
  describe('for small devices', () => {
    beforeEach(() => {
      window.innerWidth = 599
    })

    describe('from /', () => {
      it('creates a new note with title and body and navigates to it. Closes sidebar', async () => {
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

        const { container, getByTestId, history } = await renderWithRouter(
          <App />
        )

        fireEvent.click(getByTestId('CreateNote__btn'))

        expect(createNote).toHaveBeenCalledWith(expectedUid, expectedNoteId)
        expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
        expect(getByTestId('Note__title').value).toBe(expectedTitle)
        expect(getByTestId('Note__body').value).toBe(expectedBody)
        expect(container.querySelector(`.${sidebarStyles.open}`)).toBeNull()
      })
    })

    describe('from /:noteId', () => {
      it('Opens sidebar. Creates a new note with title and body and navigates to it. Closes sidebar', async () => {
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

        const {
          container,
          getByAltText,
          getByTestId,
          history
        } = await renderWithRouter(<App />, { route: '/anotherNoteId' })

        fireEvent.click(getByAltText('hamburger menu'))
        expect(container.querySelector(`.${sidebarStyles.open}`)).not.toBeNull()

        fireEvent.click(getByTestId('CreateNote__btn'))

        expect(createNote).toHaveBeenCalledWith(expectedUid, expectedNoteId)
        expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
        expect(getByTestId('Note__title').value).toBe(expectedTitle)
        expect(getByTestId('Note__body').value).toBe(expectedBody)
        expect(container.querySelector(`.${sidebarStyles.open}`)).toBeNull()
      })
    })
  })

  describe('for non-small devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })

    describe('from /', () => {
      it('creates a new note with title and body and navigates to it. Does not close sidebar', async () => {
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

        const { container, history, getByTestId } = await renderWithRouter(
          <App />
        )

        fireEvent.click(getByTestId('CreateNote__btn'))

        expect(createNote).toHaveBeenCalledWith(expectedUid, expectedNoteId)
        expect(history.entries[1].pathname).toBe('/' + expectedNoteId)
        expect(getByTestId('Note__title').value).toBe(expectedTitle)
        expect(getByTestId('Note__body').value).toBe(expectedBody)
        expect(container.querySelector(`.${sidebarStyles.open}`)).not.toBeNull()
      })
    })
  })
})
