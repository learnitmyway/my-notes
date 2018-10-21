/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import uuidv1 from 'uuid/v1'

import Main from './Main'
import { createNote } from './noteService'

jest.mock('uuid/v1')
jest.mock('./noteService')

describe('Main', () => {
  it('creates a new note when clicking the button', () => {
    const noteId = 'noteId'
    uuidv1.mockReturnValue(noteId)

    const uid = 'uid'
    const wrapper = shallow(<Main uid={uid} />)

    const button = wrapper.find('button')
    button.simulate('click')

    expect(createNote).toHaveBeenCalledWith(uid, noteId)
  })
})
