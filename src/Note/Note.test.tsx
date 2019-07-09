import React from 'react'
import { fireEvent, render } from 'react-testing-library'
import moment from 'moment'

import Note from './Note'

import { logError, logWarning } from '../logService'
import { deleteNote, readNote, updateNote } from '../noteService/noteService'

jest.mock('moment')
jest.mock('../noteService/noteService')
jest.mock('../logService')

const momentMock = moment as jest.Mock
const readNoteMock = readNote as jest.Mock

const defaultProps = {
  match: { params: { noteId: 'someNoteId' } },
  uid: 'someUid'
}

describe('Note', () => {
  beforeEach(() => {
    const snapshot = {
      val() {
        return { title: 'title', body: 'body', lastModified: 1554907683672 } // 2019-04-10T16:48:03.672
      }
    }

    readNoteMock.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    momentMock.mockReturnValue({ format: jest.fn() })
  })

  it('displays note', () => {
    const body = 'body'
    const title = 'title'
    const lastModified = 1054907683672
    const note = { title, body, lastModified }
    const snapshot = {
      val() {
        return note
      }
    }
    readNoteMock.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    momentMock.mockReset()
    const format = jest.fn(() => 'April 10, 2019')
    momentMock.mockReturnValue({ format })

    const { container, getByTestId } = render(<Note {...defaultProps} />)

    expect(getByTestId('Note__title').value).toBe(title)
    expect(getByTestId('Note__body').value).toBe(body)
    expect(container.querySelector('time')).toHaveTextContent('April 10, 2019')
    expect(momentMock).toHaveBeenCalledWith(lastModified)
    expect(format).toHaveBeenCalledWith('LL')
  })

  it('does not display error', () => {
    const { queryByTestId } = render(<Note {...defaultProps} />)

    expect(queryByTestId('Note__error')).not.toBeInTheDocument()
  })

  it('displays empty note when there is no note id in url path', () => {
    const match = { params: {} }
    const { queryByTestId } = render(<Note {...defaultProps} match={match} />)

    expect(queryByTestId('Note__title')).not.toBeInTheDocument()
    expect(queryByTestId('Note__body')).not.toBeInTheDocument()
    expect(queryByTestId('Note__error')).not.toBeInTheDocument()
  })

  it('displays error and logs warning when there is no note', () => {
    const snapshot = {
      val() {
        return null
      }
    }
    readNoteMock.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    const noteId = 'noteId'
    const match = { params: { noteId } }
    const { queryByTestId } = render(<Note {...defaultProps} match={match} />)

    expect(logWarning).toHaveBeenCalledWith('Not able to read note: ' + noteId)
    expect(queryByTestId('Note__error')).toHaveTextContent(
      'Note cannot be found'
    )
  })

  it('displays and logs error when reading note fails', () => {
    const err = new Error('Something bad happened')

    readNoteMock.mockImplementation(
      (a, b, successCallback, failureCallBack) => {
        failureCallBack(err)
      }
    )

    const match = { params: { noteId: 'non-existant' } }
    const { queryByTestId } = render(<Note {...defaultProps} match={match} />)

    expect(logError).toHaveBeenCalledWith({
      description: 'Read note failed',
      error: err
    })
    expect(queryByTestId('Note__error')).toHaveTextContent(
      'Note cannot be found'
    )
  })

  it('does not display note when reading note fails', () => {
    const err = new Error('Something bad happened')

    readNoteMock.mockImplementation(
      (a, b, successCallback, failureCallBack) => {
        failureCallBack(err)
      }
    )

    const match = { params: { noteId: 'non-existant' } }
    const { queryByTestId } = render(<Note {...defaultProps} match={match} />)

    expect(queryByTestId('Note__title')).not.toBeInTheDocument()
    expect(queryByTestId('Note__body')).not.toBeInTheDocument()
  })

  it('hides error after successful read', () => {
    readNoteMock.mockImplementationOnce(
      (a, b, successCallback, failureCallBack) => {
        failureCallBack(new Error())
      }
    )

    const snapshot = {
      val() {
        return { title: 'title', body: 'body' }
      }
    }
    readNoteMock.mockImplementationOnce((a, b, cb) => {
      cb(snapshot)
    })

    const uid = 'someUid'
    const noteId1 = 'noteId1'
    const match1 = { params: { noteId: noteId1 } }
    const prevProps = { ...defaultProps, uid, match: match1 }
    const { rerender, queryByText } = render(<Note {...prevProps} />)

    const noteId2 = 'noteId2'
    const match2 = { params: { noteId: noteId2 } }
    const props = { ...prevProps, match: match2 }
    rerender(<Note {...props} />)

    expect(queryByText('Note cannot be found')).toBeNull()
  })

  it('reads new note when note id changes', () => {
    const uid = 'someUid'
    const noteId1 = 'noteId1'
    const match1 = { params: { noteId: noteId1 } }
    const prevProps = { ...defaultProps, uid, match: match1 }
    const { rerender } = render(<Note {...prevProps} />)

    const noteId2 = 'noteId2'
    const match2 = { params: { noteId: noteId2 } }
    const props = { ...prevProps, match: match2 }
    rerender(<Note {...props} />)

    expect(readNoteMock).toHaveBeenCalledWith(
      uid,
      noteId2,
      expect.any(Function),
      expect.any(Function)
    )
  })

  it('applies class names from props', () => {
    const { container } = render(
      <Note {...defaultProps} classNames="forty-two" />
    )

    expect(container.querySelector('.forty-two')).not.toBeNull()
  })

  it('updates note on change and handles title change', () => {
    const body = 'body'
    const title = 'title'
    const lastModified = 1054907683672
    const note = { title, body, lastModified }
    const snapshot = {
      val() {
        return note
      }
    }
    readNoteMock.mockImplementation((a, b, cb) => {
      cb(snapshot)
    })

    momentMock.mockReset()
    const format = jest.fn(() => 'April 10, 2019')
    momentMock.mockReturnValue({ format })

    const handleTitleChange = jest.fn()
    const uid = 'uid'
    const noteId = 'noteId'
    const match = { params: { noteId } }
    const { container, getByTestId } = render(
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
    expect(getByTestId('Note__body').value).toBe(newBody)
    expect(container.querySelector('time')).toHaveTextContent('April 10, 2019')
    expect(momentMock).toHaveBeenCalledWith(lastModified)
    expect(format).toHaveBeenCalledWith('LL')
  })

  it('deletes note and navigates back to root route', async () => {
    const noteIdToDelete = 'abc123'
    const expectedUid = 'expectedUid'

    deleteNote.mockResolvedValue()

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
    expect(logError).toHaveBeenCalledWith({
      description: 'Delete note failed',
      error: err
    })
  })

  it('does not display delete button when there is no title and body', async () => {
    const match = { params: {} }
    const { queryByText } = await render(
      <Note {...defaultProps} match={match} />
    )

    expect(queryByText('Delete')).toBeNull()
  })
})
