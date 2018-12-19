/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import NoteList from './NoteList'
import NoteListItem from './NoteListItem/NoteListItem'
import { readAllNotes } from '../../service/noteService/noteService'

jest.mock('../../service/noteService/noteService')

describe('NoteList', () => {
  it('renders list items', () => {
    const note = {
      title: 'title',
      body: 'body'
    }
    const notes = {
      'note1': note,
      'note2': note,
      'note3': note

    }
    const snapshot = {
      val: function () {
        return notes
      }
    }
    readAllNotes.mockImplementation((uid, cb) => {
      cb(snapshot)
    })

    const uid = 'uid'
    const wrapper = shallow(<NoteList uid={uid} />)

    expect(readAllNotes).toHaveBeenCalledWith(uid, expect.any(Function), expect.any(Function))
    expect(wrapper.find(NoteListItem).length).toBe(3)
  })

  it('renders and logs error when reading all notes fails', () => {
    console.error = jest.fn()
    const err = new Error('Something bad happened')

    readAllNotes.mockImplementation((uid, successCallback, failureCallBack) => {
      failureCallBack(err)
    })

    const wrapper = shallow(<NoteList uid='' />)

    expect(console.error).toHaveBeenCalledWith(err)
    expect(wrapper.find('.NoteList-error').text()).toBe('Notes cannot be found')
  })
})
