import React from 'react'
import { render, fireEvent, waitForElement } from 'react-testing-library'
import Note from './Note'

import { readNote, updateNote } from '../noteService/noteService'

jest.mock('../noteService/noteService')

describe('Note', () => {
  it('does not display error', () => {
    const body = 'body'
    const title = 'title'
    const note = { title, body }
    const snapshot = {
      val: function() {
        return note
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const uid = 'someUid'
    const noteId = 'someNoteId'
    const match = { params: { noteId: noteId } }
    const { queryByTestId } = render(
      <Note onTitleChange={jest.fn()} uid={uid} match={match} />
    )

    expect(queryByTestId('Note__error')).not.toBeInTheDocument()
  })

  it('displays empty note when there is no note id in url path', () => {
    const uid = 'someUid'
    const match = { params: {} }
    const { queryByTestId } = render(
      <Note onTitleChange={jest.fn()} uid={uid} match={match} />
    )

    expect(queryByTestId('Note__title')).not.toBeInTheDocument()
    expect(queryByTestId('Note__body')).not.toBeInTheDocument()
    expect(queryByTestId('Note__error')).not.toBeInTheDocument()
  })

  it('displays and logs error when reading note fails (eg. user is not authenticated)', () => {
    console.error = jest.fn()
    const err = new Error('Something bad happened')

    readNote.mockImplementation(
      (uid, noteId, successCallback, failureCallBack) => {
        failureCallBack(err)
      }
    )

    const match = { params: { noteId: 'non-existant' } }
    const { queryByTestId } = render(
      <Note onTitleChange={jest.fn()} uid="" match={match} />
    )

    expect(console.error).toHaveBeenCalledWith(err)
    expect(queryByTestId('Note__error')).toHaveTextContent(
      'Note cannot be found'
    )
  })

  it('displays and logs error when there is no note', () => {
    console.error = jest.fn()

    const snapshot = {
      val: function() {
        return null
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const noteId = 'noteId'
    const match = { params: { noteId } }
    const { queryByTestId } = render(
      <Note onTitleChange={jest.fn()} uid="uid" match={match} />
    )

    expect(console.error).toHaveBeenCalledWith(
      'Not able to read note: ' + noteId
    )
    expect(queryByTestId('Note__error')).toHaveTextContent(
      'Note cannot be found'
    )
  })

  it('does not display note title or body if there is an error', () => {
    console.error = jest.fn()
    const err = new Error('Something bad happened')

    readNote.mockImplementation(
      (uid, noteId, successCallback, failureCallBack) => {
        failureCallBack(err)
      }
    )

    const match = { params: { noteId: 'non-existant' } }
    const { queryByTestId } = render(
      <Note onTitleChange={jest.fn()} uid="" match={match} />
    )

    expect(queryByTestId('Note__title')).not.toBeInTheDocument()
    expect(queryByTestId('Note__body')).not.toBeInTheDocument()
  })

  it('reads new note when note id changes', () => {
    const uid = 'someUid'
    const noteId1 = 'noteId1'
    const match1 = { params: { noteId: noteId1 } }
    const prevProps = { uid, match: match1 }
    const { rerender } = render(
      <Note onTitleChange={jest.fn()} {...prevProps} />
    )

    const noteId2 = 'noteId2'
    const match2 = { params: { noteId: noteId2 } }
    const props = { uid, match: match2 }
    rerender(<Note onTitleChange={jest.fn()} {...props} />)

    expect(readNote).toHaveBeenCalledWith(
      uid,
      noteId2,
      expect.any(Function),
      expect.any(Function)
    )
  })

  it('applies class names from props', () => {
    const match = { params: { noteId: 'id' } }
    const { container } = render(
      <Note
        classNames="forty-two"
        onTitleChange={jest.fn()}
        uid="uid"
        match={match}
      />
    )

    expect(container.querySelector('.forty-two')).not.toBeNull()
  })

  it('updates title and body on change and handles it', () => {
    const body = 'body'
    const title = 'title'
    const note = { title, body }
    const snapshot = {
      val: function() {
        return note
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const handleTitleChange = jest.fn()
    const uid = 'uid'
    const noteId = 'noteId'
    const match = { params: { noteId } }
    const { getByTestId } = render(
      <Note onTitleChange={handleTitleChange} uid={uid} match={match} />
    )

    const newTitle = 'new title'
    fireEvent.input(getByTestId('Note__title'), { target: { value: newTitle } })

    const newBody = 'new body'
    fireEvent.input(getByTestId('Note__body'), { target: { value: newBody } })

    expect(updateNote).toHaveBeenCalledWith(uid, noteId, newTitle, body)
    expect(updateNote).toHaveBeenCalledWith(uid, noteId, newTitle, newBody)
    expect(handleTitleChange).toHaveBeenCalledWith({
      id: noteId,
      title: newTitle
    })
    expect(getByTestId('Note__title').value).toBe(newTitle)
  })
})
