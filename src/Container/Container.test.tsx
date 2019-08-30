import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import { readAllNotes, readNote } from '../noteService/noteService'
import Container from './Container'

jest.mock('../noteService/noteService')

describe('Container', () => {
  const initialProps = {
    match: { params: { noteId: 'noteId' } },
    uid: 'uid'
  }

  it('displays note', () => {
    const { getByTestId } = renderWithRouter(<Container {...initialProps} />)

    expect(getByTestId('Note')).not.toBeNull()
  })

  describe('for large devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })

    it('displays new note title in sidebar when note title changes', () => {
      const note = { title: 'title', body: 'body' }
      const snapshot = {
        val() {
          return note
        }
      }
      readNote.mockImplementation((uid, noteId, cb) => {
        cb(snapshot)
      })

      const notes = {
        note0: {},
        note1: {},
        note2: note
      }

      const allSnapshot = {
        val() {
          return notes
        }
      }
      readAllNotes.mockImplementation((uid, cb) => {
        cb(allSnapshot)
      })

      const match = {
        params: {
          noteId: 'note2'
        }
      }
      const { getByTestId, getAllByTestId } = renderWithRouter(
        <Container {...initialProps} match={match} />
      )

      const newTitle = 'new title'
      fireEvent.input(getByTestId('Note__title'), {
        target: { value: newTitle }
      })

      expect(getAllByTestId('NoteListItem')[2]).toHaveTextContent(newTitle)
    })
  })
})
