/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Note from './Note'
import { readNote } from './noteService'

jest.mock('./noteService')

describe('Note', () => {
  it('reads note on mount', () => {
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

    expect(wrapper.state().title).toBe(note.title)
    expect(wrapper.state().body).toBe(note.body)
  })
})
