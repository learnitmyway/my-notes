/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Note from './Note'
import { readNote } from '../../service/noteService/noteService'

jest.mock('../../service/noteService/noteService')

describe('Note', () => {
  it('renders note', () => {
    const note = {
      title: 'title',
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

    const uid = 'someUid'
    const noteId = 'someNoteId'
    const match = {params: {noteId: noteId}}
    const wrapper = shallow(<Note uid={uid} match={match} />)

    expect(wrapper.find('.Note-title').text()).toBe(note.title)
    expect(wrapper.find('.Note-body').text()).toBe(note.body)
  })

  it('renders and logs error when note cannot be read', () => {
    console.error = jest.fn()
    const err = new Error('Something bad happened')

    const errorNote = {
      title: 'Note cannot be found',
      body: ''
    }
    readNote.mockImplementation((uid, noteId, successCallback, failureCallBack) => {
      failureCallBack(err)
    })

    const uid = 'someUid'
    const noteId = 'someNoteId'
    const match = {params: {noteId: noteId}}
    const wrapper = shallow(<Note uid={uid} match={match} />)

    expect(console.error).toHaveBeenCalledWith(err)
    expect(wrapper.find('.Note-title').text()).toBe(errorNote.title)
    expect(wrapper.find('.Note-body').text()).toBe(errorNote.body)
  })

  it('reads new note when note id changes', () => {
    const uid = 'someUid'
    const noteId1 = 'noteId1'
    const match1 = {params: {noteId: noteId1}}
    const prevProps = {uid, match: match1}
    const wrapper = shallow(<Note {...prevProps} />)

    const noteId2 = 'noteId2'
    const match2 = {params: {noteId: noteId2}}
    const props = {uid, match: match2}
    wrapper.setProps(props)

    expect(readNote).toHaveBeenCalledWith(uid, noteId2, expect.any(Function), expect.any(Function))
  })

  it('applies class names from props', () => {
    const match = {params: {noteId: 'id'}}
    const wrapper = shallow(<Note classNames='forty-two' uid='uid' match={match} />)
    expect(wrapper.find('.forty-two').length).toBe(1)
  })
})
