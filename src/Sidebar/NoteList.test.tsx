import React from 'react'
import { waitForElement } from 'react-testing-library'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import { readAllNotes } from '../noteService/noteService'
import NoteList from './NoteList'
import NoteListItem from './NoteListItem'

import { logError } from '../logService'

jest.mock('../noteService/noteService')
jest.mock('../logService')

const defaultProps = {
  match: { params: { noteId: 'someNoteId' } },
  uid: 'someUid'
}

describe('NoteList', () => {
  beforeEach(() => {
    const note = {
      body: 'body',
      title: 'title'
    }

    const notes = {
      note1: note,
      note2: note,
      note3: note
    }

    const snapshot = {
      val() {
        return notes
      }
    }
    readAllNotes.mockImplementation((uid, cb) => {
      cb(snapshot)
    })
  })

  it('renders list items', () => {
    const uid = 'uid'
    const { getAllByText } = renderWithRouter(
      <NoteList {...defaultProps} uid={uid} />
    )

    expect(readAllNotes).toHaveBeenCalledWith(
      uid,
      expect.any(Function),
      expect.any(Function)
    )

    expect(getAllByText('title').length).toBe(3)
  })

  it('displays sorted list starting with most recently modified', () => {
    const body = 'body'
    const notes = {
      note1: { title: 'title1', body, lastModified: 1 },
      note2: { title: 'title2', body, lastModified: 2 },
      note3: { title: 'title3', body, lastModified: 0 }
    }

    const snapshot = {
      val() {
        return notes
      }
    }
    readAllNotes.mockImplementation((aUid, cb) => {
      cb(snapshot)
    })

    const uid = 'uid'
    const { getAllByTestId } = renderWithRouter(
      <NoteList {...defaultProps} uid={uid} />
    )

    const noteTitles = getAllByTestId('NoteListItem__title')
    expect(noteTitles[0]).toHaveTextContent('title2')
    expect(noteTitles[1]).toHaveTextContent('title1')
    expect(noteTitles[2]).toHaveTextContent('title3')
  })

  it('displays and logs error when reading all notes fails', async () => {
    const err = new Error('Something bad happened')

    readAllNotes.mockImplementation(
      (aUid, aSuccessCallback, failureCallBack) => {
        failureCallBack(err)
      }
    )

    const { getByText } = renderWithRouter(
      <NoteList {...defaultProps} uid="" />
    )

    expect(logError).toHaveBeenCalledWith(`Cannot read all notes`, err)
    await waitForElement(() => getByText('Notes cannot be found'))
  })

  describe('Note', () => {
    it('styles selected item', () => {
      const selectedNoteId = 'noteId2'
      const snapshot = {
        val() {
          return {
            note1: {},
            [selectedNoteId]: { title: 'displayed', body: 'not displayed' },
            note3: {}
          }
        }
      }
      readAllNotes.mockImplementation((aUid, cb) => {
        cb(snapshot)
      })

      const match = { params: { noteId: selectedNoteId } }
      const { getAllByTestId } = renderWithRouter(
        <NoteList {...defaultProps} match={match} />
      )

      expect(getAllByTestId('NoteListItem')[1]).toHaveClass(
        'NoteListItem NoteListItem--selected'
      )
    })

    it('displays list item title as "Untitled" if there is no note title', () => {
      const noteIdWithNoTitle = 'noteId2'
      const snapshot = {
        val() {
          return {
            note1: {},
            [noteIdWithNoTitle]: { title: '', body: 'not displayed' },
            note3: {}
          }
        }
      }
      readAllNotes.mockImplementation((aUid, cb) => {
        cb(snapshot)
      })

      const match = { params: { noteId: noteIdWithNoTitle } }
      const { getAllByTestId } = renderWithRouter(
        <NoteList {...defaultProps} match={match} />
      )

      expect(getAllByTestId('NoteListItem')[1]).toHaveTextContent('Untitled')
    })
  })
})
