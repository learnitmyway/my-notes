/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Container from './Container'
import Note from '../Note/Note'
import Main from '../Main/Main'
import { readNote, updateNote } from '../../service/noteService/noteService'

jest.mock('../../service/noteService/noteService')

describe('Container', () => {
  it('renders note component', () => {
    const match = {params: {noteId: 'some note id'}}
    const wrapper = shallow(<Container uid='some uid' match={match} />)
    expect(wrapper.find(Note).length).toBe(1)
  })

  it('renders main and note components for larger screen widths', () => {
    window.innerWidth = 600
    const match = {params: {noteId: 'some note id'}}
    const wrapper = shallow(<Container uid='some uid' match={match} />)

    const mainComponentProps = wrapper.find(Main).props()
    expect(mainComponentProps.classNames).toBe('Main--not-small')
    expect(mainComponentProps.match).toBe(match)
    expect(wrapper.find(Note).props().classNames).toBe('Note--not-small')
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
    expect(wrapper.find(Note).props().match).toBe(match)
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

  it('updates title on change', () => {
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
