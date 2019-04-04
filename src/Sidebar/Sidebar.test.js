/* eslint-env jest */

import React from 'react'
import uuidv1 from 'uuid/v1'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitForElement } from 'react-testing-library'

import Sidebar from './Sidebar'
import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

import { createNote } from '../noteService/noteService'

jest.mock('uuid/v1')
jest.mock('../noteService/noteService')

function renderWithRouter(ui) {
  const route = '/'
  const history = createMemoryHistory({ initialEntries: [route] })
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
}

describe('Sidebar', () => {
  it('creates and navigates to new note when on click', () => {
    const noteId = 'noteId'
    uuidv1.mockReturnValue(noteId)

    const uid = 'uid'
    const { history, getByTestId } = renderWithRouter(<Sidebar uid="uid" />)

    fireEvent.click(getByTestId('CreateNote__btn'))

    expect(createNote).toHaveBeenCalledWith(uid, noteId)
    expect(history.entries[1].pathname).toBe('/' + noteId)
  })

  it('renders note list', () => {
    const currentNote = { id: 'id', title: 'title' }
    const match = { params: { noteId: 'noteId' } }
    const { getByTestId } = renderWithRouter(
      <Sidebar currentNote={currentNote} uid="uid" match={match} />
    )

    expect(getByTestId('NoteList')).not.toBeNull()
  })

  it('applies class names from props', () => {
    const { container } = renderWithRouter(
      <Sidebar classNames="forty-two" uid="uid" />
    )

    expect(container.querySelector('.forty-two')).not.toBeNull()
  })
})
