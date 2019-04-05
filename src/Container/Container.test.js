/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { fireEvent, getByAltText } from 'react-testing-library'
import 'jest-dom/extend-expect'

import { renderWithRouter } from '../testUtils/renderWithRouter'

import Container from './Container'
import Note from '../Note/Note'
import Sidebar from '../Sidebar/Sidebar'

import { readNote, readAllNotes } from '../noteService/noteService'

jest.mock('../noteService/noteService')

describe('Container', () => {
  const initialProps = {
    uid: 'uid',
    match: { params: { noteId: 'noteId' } }
  }

  it('displays navigation bar', () => {
    const { container } = renderWithRouter(<Container {...initialProps} />)

    expect(container.querySelector('nav')).not.toBe(null)
  })

  it('displays note', () => {
    const { getByTestId } = renderWithRouter(<Container {...initialProps} />)

    expect(getByTestId('Note')).not.toBeNull()
  })

  describe('for small devices', () => {
    beforeEach(() => {
      window.innerWidth = 599
    })

    it('does not display sidebar', () => {
      const { queryByTestId } = renderWithRouter(
        <Container {...initialProps} />
      )

      expect(queryByTestId('Sidebar')).toBeNull()
    })

    it('displays sidebar when hamburger menu is clicked', () => {
      const { getByAltText, queryByTestId } = renderWithRouter(
        <Container {...initialProps} />
      )

      fireEvent.click(getByAltText('hamburger menu'))

      expect(queryByTestId('Sidebar')).not.toBeNull()
    })

    it('displays sidebar with correct class names', () => {
      const { getByAltText, container } = renderWithRouter(
        <Container {...initialProps} />
      )

      fireEvent.click(getByAltText('hamburger menu'))

      expect(container.querySelector('.Sidebar--not-small')).toBeNull()
    })
  })

  describe('for large devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })

    it('displays sidebar', () => {
      const { queryByTestId } = renderWithRouter(
        <Container {...initialProps} />
      )

      expect(queryByTestId('Sidebar')).not.toBeNull()
    })

    it('displays sidebar with correct class names', () => {
      const { container } = renderWithRouter(<Container {...initialProps} />)

      expect(
        container.querySelector('.Sidebar.Sidebar--not-small')
      ).not.toBeNull()
    })

    it('displays new note title in sidebar when note title changes', () => {
      const note = { title: 'title', body: 'body' }
      const snapshot = {
        val: function() {
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
        val: function() {
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

      expect(getAllByTestId('NoteListItem__title')[2]).toHaveTextContent(
        newTitle
      )
    })
  })
})
