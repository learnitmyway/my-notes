/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Container from './Container'
import Note from '../Note/Note'
import Main from '../Main/Main'
import { readNote, updateNote } from '../../service/noteService/noteService'

jest.mock('../../service/noteService/noteService')

describe('Container', () => {
  const initialProps = {
    uid: 'uid',
    match: {params: {noteId: 'noteId'}}
  }

  describe('for small devices', () => {
    beforeEach(() => {
      window.innerWidth = 599
    })

    it('renders', () => {
      const wrapper = shallow(<Container {...initialProps} />)
      expect(wrapper.props().className).toBe('Container')
    })

    it('renders note component', () => {
      const wrapper = shallow(<Container {...initialProps} />)

      expect(wrapper.find(Main).length).toBe(0)
      expect(wrapper.find(Note).props().classNames).toBe()
    })
  })

  describe('for large devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })

    it('renders', () => {
      const wrapper = shallow(<Container {...initialProps} />)
      expect(wrapper.props().className).toBe('Container Container--not-small')
    })

    it('renders main and note components', () => {
      const uid = 'uid'
      const match = {params: {noteId: 'some note id'}}
      const wrapper = shallow(<Container uid='uid' match={match} />)

      const mainProps = wrapper.find(Main).props()
      expect(mainProps.classNames).toBe('Main--not-small')
      expect(mainProps.match).toBe(match)
      expect(mainProps.uid).toBe(uid)

      const noteProps = wrapper.find(Note).props()
      expect(noteProps.classNames).toBe('Note--not-small')
    })
  })

  it('reads note and passes it as a prop', () => {
    const expectedNote = {
      title: 'title',
      body: 'body'
    }
    const snapshot = {
      val: function () {
        return expectedNote
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const match = {params: {noteId: 'noteId'}}
    const wrapper = shallow(<Container uid='uid' match={match} />)

    expect(wrapper.find(Note).props().note).toBe(expectedNote)
  })

  it('reads new note when note id changes', () => {
    const uid = 'someUid'
    const noteId1 = 'noteId1'
    const match1 = {params: {noteId: noteId1}}
    const prevProps = {uid, match: match1}
    const wrapper = shallow(<Container {...prevProps} />)

    const noteId2 = 'noteId2'
    const match2 = {params: {noteId: noteId2}}
    const props = {uid, match: match2}
    wrapper.setProps(props)

    expect(readNote).toHaveBeenCalledWith(uid, noteId2, expect.any(Function), expect.any(Function))
  })

  it('logs error and passes it as prop when there is no note', () => {
    console.error = jest.fn()

    const snapshot = {
      val: function () {
        return null
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const noteId = 'notId'
    const match = {params: {noteId}}
    const wrapper = shallow(<Container uid='uid' match={match} />)

    expect(console.error).toHaveBeenCalledWith('Not able to read note: ' + noteId)
    expect(wrapper.find(Note).props().isError).toBe(true)
  })

  it('logs error and passes it as prop when reading note fails (eg. user is not authenticated)', () => {
    console.error = jest.fn()
    const err = new Error('Something bad happened')

    readNote.mockImplementation((uid, noteId, successCallback, failureCallBack) => {
      failureCallBack(err)
    })

    const match = {params: {noteId: 'non-existant'}}
    const wrapper = shallow(<Container uid='uid' match={match} />)

    expect(console.error).toHaveBeenCalledWith(err)
    expect(wrapper.find(Note).props().isError).toBe(true)
  })

  it('does not read note when there is not note id', () => {
    const match = {params: {}}
    const wrapper = shallow(<Container uid='uid' match={match} />)

    expect(readNote).not.toHaveBeenCalled()
    expect(wrapper.find(Note).props().isError).toBe(false)
  })

  it('updates note title on change', () => {
    const body = 'body'
    const note = {
      title: 'title',
      body
    }
    const snapshot = {
      val: function () {
        return note
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const uid = 'uid'
    const noteId = 'noteId'
    const match = {params: {noteId}}
    const wrapper = shallow(<Container uid={uid} match={match} />)

    const newTitle = 'new title'
    wrapper.find(Note).props().onTitleChange(newTitle)

    const expectedNote = {...note, title: newTitle}

    expect(updateNote).toHaveBeenCalledWith(uid, noteId, newTitle, body)
    expect(wrapper.find(Note).props().note).toEqual(expectedNote)
  })

  it('updates note body on change', () => {
    const title = 'title'
    const note = {
      title,
      body: 'body'
    }
    const snapshot = {
      val: function () {
        return note
      }
    }
    readNote.mockImplementation((uid, noteId, cb) => {
      cb(snapshot)
    })

    const uid = 'uid'
    const noteId = 'noteId'
    const match = {params: {noteId}}
    const wrapper = shallow(<Container uid={uid} match={match} />)

    const newBody = 'new body'
    wrapper.find(Note).props().onBodyChange(newBody)

    const expectedNote = {...note, body: newBody}
    expect(updateNote).toHaveBeenCalledWith(uid, noteId, title, newBody)
    expect(wrapper.find(Note).props().note).toEqual(expectedNote)
  })

  it('passes note as prop on note title change', () => {
    const noteId = 'noteId'
    const match = {params: {noteId}}
    const wrapper = shallow(<Container uid='some uid' match={match} />)

    const newTitle = 'new title'
    const currentNote = {id: noteId, title: newTitle}
    wrapper.find(Note).props().onTitleChange(newTitle)

    expect(wrapper.find(Main).props().currentNote).toEqual(currentNote)
  })
})
