/* eslint-env jest */

import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import uuidv1 from 'uuid/v1'

import CreateNote from './CreateNote'
import { createNote } from '../noteService/noteService'

jest.mock('uuid/v1')
jest.mock('../../service/noteService/noteService')

describe('CreateNote', () => {
  it('creates and navigates to new note when clicking the button', () => {
    const noteId = 'noteId'
    uuidv1.mockReturnValue(noteId)

    const uid = 'uid'
    const wrapper = shallow(<CreateNote uid={uid} />)

    const link = wrapper.find(Link)
    link.simulate('click')

    expect(createNote).toHaveBeenCalledWith(uid, noteId)
    expect(wrapper.find('.CreateNote-button').props().to).toBe('/' + noteId)
  })
})
