import 'jest-dom/extend-expect'
import React from 'react'
import { fireEvent } from 'react-testing-library'

import { readAllNotes, readNote } from '../noteService/noteService'
import sidebarStyles from '../Sidebar/Sidebar.module.css'
import { renderWithRouter } from '../testUtils/renderWithRouter'
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

  describe('for small devices', () => {
    beforeEach(() => {
      window.innerWidth = 599
    })

    it('displays navigation bar', () => {
      const { container } = renderWithRouter(<Container {...initialProps} />)

      expect(container.querySelector('nav')).not.toBe(null)
    })

    it('does not display sidebar', () => {
      const { container } = renderWithRouter(<Container {...initialProps} />)

      expect(
        container.querySelector(`.${sidebarStyles.root}.${sidebarStyles.open}`)
      ).toBeNull()
    })

    it('displays sidebar when hamburger menu is clicked', () => {
      const { container, getByAltText } = renderWithRouter(
        <Container {...initialProps} />
      )

      fireEvent.click(getByAltText('hamburger menu'))

      expect(
        container.querySelector(`.${sidebarStyles.root}.${sidebarStyles.open}`)
      ).not.toBeNull()
    })

    it('displays sidebar with correct class names', () => {
      const { getByAltText, container } = renderWithRouter(
        <Container {...initialProps} />
      )

      fireEvent.click(getByAltText('hamburger menu'))

      expect(
        container.querySelector(
          `.${sidebarStyles.root}.${sidebarStyles.small}.${sidebarStyles.open}`
        )
      ).not.toBeNull()
    })
  })

  describe('for large devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })
    it('does not display nav bar', () => {
      const { container } = renderWithRouter(<Container {...initialProps} />)

      expect(container.querySelector('nav')).toBe(null)
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
        container.querySelector(
          `.${sidebarStyles.root}.${sidebarStyles.notSmall}`
        )
      ).not.toBeNull()
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

      expect(getAllByTestId('NoteListItem__title')[2]).toHaveTextContent(
        newTitle
      )
    })
  })
})
