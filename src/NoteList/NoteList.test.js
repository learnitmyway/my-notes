import React from 'react'
import { shallow } from 'enzyme'

import NoteList from './NoteList'
import NoteListItem from './NoteListItem/NoteListItem'
import { readAllNotes } from '../noteService/noteService'

jest.mock('../noteService/noteService')

const note = {
  title: 'title',
  body: 'body'
}

const notes = {
  note1: note,
  note2: note,
  note3: note
}

describe('NoteList', () => {
  beforeEach(() => {
    const snapshot = {
      val: function() {
        return notes
      }
    }
    readAllNotes.mockImplementation((uid, cb) => {
      cb(snapshot)
    })
  })

  it('renders list items', () => {
    const uid = 'uid'
    const wrapper = shallow(<NoteList uid={uid} />)

    expect(readAllNotes).toHaveBeenCalledWith(
      uid,
      expect.any(Function),
      expect.any(Function)
    )
    expect(wrapper.find(NoteListItem).length).toBe(3)
  })

  it('renders list items when a note has been added', () => {
    const snapshot = {
      val: function() {
        return notes
      }
    }
    readAllNotes.mockImplementationOnce((uid, cb) => {
      cb(snapshot)
    })

    const newNote = { title: 'new', body: 'and improved' }
    const newNotes = { ...notes, newNote }

    const newSnapshot = {
      val: function() {
        return newNotes
      }
    }
    readAllNotes.mockImplementationOnce((uid, cb) => {
      cb(newSnapshot)
    })

    const uid = 'uid'
    const prevProps = {
      uid,
      match: { params: {} }
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
    const note = {
      title: 'title',
      body: 'body'
    }
    const notes = {
      note1: note,
      [currentNoteId]: note,
      note3: note
    }
    const snapshot = {
      val: function() {
        return notes
      }
    }
    readAllNotes.mockImplementation((uid, cb) => {
      cb(snapshot)
    })

    const uid = 'uid'
    const currentNoteTitle = 'new title'
    const currentNote = {
      id: currentNoteId,
      title: currentNoteTitle
    }
    const wrapper = shallow(<NoteList uid={uid} currentNote={currentNote} />)

    expect(
      wrapper
        .find(NoteListItem)
        .at(1)
        .props().title
    ).toBe(currentNoteTitle)
  })

  it('renders and logs error when reading all notes fails', () => {
    console.error = jest.fn()
    const err = new Error('Something bad happened')

    readAllNotes.mockImplementation((uid, successCallback, failureCallBack) => {
      failureCallBack(err)
    })

    const wrapper = shallow(<NoteList uid="" />)

    expect(console.error).toHaveBeenCalledWith(err)
    expect(wrapper.find('.NoteList-error').text()).toBe('Notes cannot be found')
  })

  it('marks selected item', () => {
    const selectedNoteId = 'noteId2'
    const notes = {
      note1: {},
      [selectedNoteId]: {},
      note3: {}
    }
    const snapshot = {
      val: function() {
        return notes
      }
    }
    readAllNotes.mockImplementation((uid, cb) => {
      cb(snapshot)
    })

    const match = { params: { noteId: selectedNoteId } }
    const wrapper = shallow(<NoteList uid="uid" match={match} />)

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
