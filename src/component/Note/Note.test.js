/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import ContentEditable from 'react-contenteditable'

import Note from './Note'
import { readNote, updateNote } from '../../service/noteService/noteService'

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
    const wrapper = shallow(<Note isError={false} onTitleChange={jest.fn()} uid={uid} match={match} />)

    expect(wrapper.find(ContentEditable).at(0).props().html).toBe(note.title)
    expect(wrapper.find(ContentEditable).at(1).props().html).toBe(note.body)
    expect(wrapper.find('.Note-error').length).toBe(0)
  })

  it('renders empty note when there is no note id in url path', () => {
    const uid = 'someUid'
    const match = {params: {}}
    const wrapper = shallow(<Note isError={false} onTitleChange={jest.fn()} uid={uid} match={match} />)

    expect(readNote).not.toHaveBeenCalled()
    expect(wrapper.find(ContentEditable).length).toBe(0)
    expect(wrapper.find('.error').length).toBe(0)
  })

  it('renders error', () => {
    const match = {params: {noteId: 'noteId'}}
    const wrapper = shallow(<Note isError onTitleChange={jest.fn()} uid='' match={match} />)

    expect(wrapper.find('.Note-error').text()).toBe('Note cannot be found')
  })

  it('reads new note when note id changes', () => {
    const uid = 'someUid'
    const noteId1 = 'noteId1'
    const match1 = {params: {noteId: noteId1}}
    const prevProps = {uid, match: match1}
    const wrapper = shallow(<Note isError={false} onTitleChange={jest.fn()} {...prevProps} />)

    const noteId2 = 'noteId2'
    const match2 = {params: {noteId: noteId2}}
    const props = {uid, match: match2}
    wrapper.setProps(props)

    expect(readNote).toHaveBeenCalledWith(uid, noteId2, expect.any(Function), expect.any(Function))
  })

  it('applies class names from props', () => {
    const match = {params: {noteId: 'id'}}
    const wrapper = shallow(<Note isError={false} classNames='forty-two' onTitleChange={jest.fn()} uid='uid' match={match} />)

    expect(wrapper.find('.forty-two').length).toBe(1)
  })

  it('updates title on change and handles it', () => {
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

    const handleTitleChange = jest.fn()
    const uid = 'uid'
    const noteId = 'noteId'
    const match = {params: {noteId}}
    const wrapper = shallow(<Note isError={false} onTitleChange={handleTitleChange} uid={uid} match={match} />)

    const newTitle = 'new title'
    wrapper.find(ContentEditable).at(0).prop('onChange')({target: {value: newTitle}})

    expect(wrapper.find(ContentEditable).at(0).props().html).toBe(newTitle)
    expect(handleTitleChange).toHaveBeenCalledWith(newTitle)
  })

  it('updates body on change', () => {
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
    const wrapper = shallow(<Note isError={false} onTitleChange={jest.fn()} uid={uid} match={match} />)

    const newBody = 'new body'
    wrapper.find(ContentEditable).at(1).prop('onChange')({target: {value: newBody}})

    expect(wrapper.find(ContentEditable).at(1).props().html).toBe(newBody)
    expect(updateNote).toHaveBeenCalledWith(uid, noteId, title, newBody)
  })
})
