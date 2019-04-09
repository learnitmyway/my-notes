import { shallow } from 'enzyme'
import React from 'react'

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
    const wrapper = shallow(<NoteList {...defaultProps} uid={uid} />)

    expect(readAllNotes).toHaveBeenCalledWith(
      uid,
      expect.any(Function),
      expect.any(Function)
    )
    expect(wrapper.find(NoteListItem).length).toBe(3)
  })

  it('renders list items when a note has been added', () => {
    const snapshot = {
      val() {
        return notes
      }
    }
    readAllNotes.mockImplementationOnce((a, cb) => {
      cb(snapshot)
    })

    const newNote = { title: 'new', body: 'and improved' }
    const newNotes = { ...notes, newNote }

    const newSnapshot = {
      val() {
        return newNotes
      }
    }
    readAllNotes.mockImplementationOnce((a, cb) => {
      cb(newSnapshot)
    })

    const uid = 'uid'
    const prevProps = {
      match: { params: {} },
      uid
    }
    const wrapper = shallow(<NoteList {...prevProps} />)

    const props = {
      ...prevProps,
      match: { params: { noteId: 'noteId' } }
    }

    wrapper.setProps(props)

    expect(wrapper.find(NoteListItem).length).toBe(4)
  })

  it('passes current note title as prop', () => {
    const currentNoteId = 'note2'
    const snapshot = {
      val() {
        return {
          note1: note,
          [currentNoteId]: note,
          note3: note
        }
      }
    }
    readAllNotes.mockImplementation((uid, cb) => {
      cb(snapshot)
    })

    const currentNoteTitle = 'new title'
    const currentNote = {
      id: currentNoteId,
      title: currentNoteTitle
    }
    const wrapper = shallow(
      <NoteList {...defaultProps} currentNote={currentNote} />
    )

    expect(
      wrapper
        .find(NoteListItem)
        .at(1)
        .props().title
    ).toBe(currentNoteTitle)
  })

  it('displays and logs error when reading all notes fails', () => {
    const err = new Error('Something bad happened')

    readAllNotes.mockImplementation((uid, successCallback, failureCallBack) => {
      failureCallBack(err)
    })

    const wrapper = shallow(<NoteList {...defaultProps} uid="" />)

    expect(log).toHaveBeenCalledWith(`Cannot read all notes`, err)
    expect(wrapper.find('.NoteList-error').text()).toBe('Notes cannot be found')
  })

  it('marks selected item', () => {
    const selectedNoteId = 'noteId2'
    const snapshot = {
      val() {
        return {
          note1: {},
          [selectedNoteId]: {},
          note3: {}
        }
      }
    }
    readAllNotes.mockImplementation((uid, cb) => {
      cb(snapshot)
    })

    const match = { params: { noteId: selectedNoteId } }
    const wrapper = shallow(<NoteList {...defaultProps} match={match} />)

    expect(
      wrapper
        .find(NoteListItem)
        .at(0)
        .props().isSelected
    ).toBe(false)
    expect(
      wrapper
        .find(NoteListItem)
        .at(1)
        .props().isSelected
    ).toBe(true)
    expect(
      wrapper
        .find(NoteListItem)
        .at(2)
        .props().isSelected
    ).toBe(false)
  })
})
