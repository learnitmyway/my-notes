import { shallow } from 'enzyme'
import React from 'react'
import { fireEvent, waitForElement } from 'react-testing-library'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import { readAllNotes } from '../noteService/noteService'
import NoteList from './NoteList'
import NoteListItem from './NoteListItem'

import { log } from '../errorService'

jest.mock('../noteService/noteService')
jest.mock('../errorService')

const note = {
  body: 'body',
  title: 'title'
}

const notes = {
  note1: note,
  note2: note,
  note3: note
}

const defaultProps = {
  match: { params: { noteId: 'someNoteId' } },
  uid: 'someUid'
}

describe('NoteList', () => {
  beforeEach(() => {
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

    expect(log).toHaveBeenCalledWith(`Cannot read all notes`, err)
    await waitForElement(() => getByText('Notes cannot be found'))
  })

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
})
