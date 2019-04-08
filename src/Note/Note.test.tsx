import React from 'react'
import { fireEvent, render } from 'react-testing-library'

import Note from './Note'

import { log } from '../errorService'
import { deleteNote, readNote, updateNote } from '../noteService/noteService'

jest.mock('../noteService/noteService')
jest.mock('../errorService')

describe('Note', () => {
  it('displays title and body', () => {
    const body = 'body'
    const title = 'title'
    const note = { title, body }
    const snapshot = {
      val() {
        return note
      }
    }
    readNote.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    const uid = 'someUid'
    const noteId = 'someNoteId'
    const match = { params: { noteId } }
    const { getByTestId } = render(
      <Note onTitleChange={jest.fn()} uid={uid} match={match} />
    )

    expect(getByTestId('Note__title').value).toBe(title)
    expect(getByTestId('Note__body').value).toBe(body)
  })

  it('does not display error', () => {
    const body = 'body'
    const title = 'title'
    const note = { title, body }
    const snapshot = {
      val() {
        return note
      }
    }
    readNote.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    const uid = 'someUid'
    const noteId = 'someNoteId'
    const match = { params: { noteId } }
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
    const err = new Error('Something bad happened')

    readNote.mockImplementation((a, b, successCallback, failureCallBack) => {
      failureCallBack(err)
    })

    const match = { params: { noteId: 'non-existant' } }
    const { queryByTestId } = render(
      <Note onTitleChange={jest.fn()} uid="" match={match} />
    )

    expect(log).toHaveBeenCalledWith('Read note failed', err)
    expect(queryByTestId('Note__error')).toHaveTextContent(
      'Note cannot be found'
    )
  })

  it('displays and logs error when there is no note', () => {
    const snapshot = {
      val() {
        return null
      }
    }
    readNote.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    const noteId = 'noteId'
    const match = { params: { noteId } }
    const { queryByTestId } = render(
      <Note onTitleChange={jest.fn()} uid="uid" match={match} />
    )

    expect(log).toHaveBeenCalledWith('Not able to read note: ' + noteId)
    expect(queryByTestId('Note__error')).toHaveTextContent(
      'Note cannot be found'
    )
  })

  it('does not display note title or body if there is an error', () => {
    const err = new Error('Something bad happened')

    readNote.mockImplementation((a, b, successCallback, failureCallBack) => {
      failureCallBack(err)
    })

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
      val() {
        return note
      }
    }
    readNote.mockImplementation((a, b, cb) => {
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

  it('deletes note and navigates back to root route', async () => {
    const noteIdToDelete = 'abc123'
    const expectedUid = 'expectedUid'

    deleteNote.mockResolvedValue()

    const snapshot = {
      val() {
        return { title: 'title', body: 'body' }
      }
    }
    readNote.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    const push = jest.fn()
    const history = { push }
    const match = { params: { noteId: noteIdToDelete } }
    const { getByText } = await render(
      <Note history={history} match={match} uid={expectedUid} />
    )

    await fireEvent.click(getByText('Delete'))

    expect(deleteNote).toHaveBeenCalledWith(expectedUid, noteIdToDelete)
    expect(push).toHaveBeenCalledWith('/')
  })

  it('logs error when delete fails', async () => {
    const noteIdToDelete = 'abc123'
    const err = new Error('Something bad happened')

    deleteNote.mockRejectedValue(err)

    const push = jest.fn()
    const history = { push }
    const match = { params: { noteId: noteIdToDelete } }
    const expectedUid = 'expectedUid'
    const { getByText } = await render(
      <Note history={history} match={match} uid={expectedUid} />
    )

    await await fireEvent.click(getByText('Delete'))

    expect(deleteNote).toHaveBeenCalledWith(expectedUid, noteIdToDelete)
    expect(push).not.toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith('Delete note failed', err)
  })
})
