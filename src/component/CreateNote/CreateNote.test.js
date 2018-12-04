/* eslint-env jest */

import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import uuidv1 from 'uuid/v1'

import CreateNote from './CreateNote'
import { createNote } from '../../service/noteService/noteService'

jest.mock('uuid/v1')
jest.mock('../../service/noteService/noteService')

describe('CreateNote', () => {
  it('creates a new note when clicking the button', () => {
    const noteId = 'noteId'
    uuidv1.mockReturnValue(noteId)

    const uid = 'uid'
    const wrapper = shallow(<CreateNote uid={uid} />)

    const link = wrapper.find(Link)
    link.simulate('click')

    expect(createNote).toHaveBeenCalledWith(uid, noteId)
  })

  it('applies class names from props', () => {
    const wrapper = shallow(<CreateNote classNames='forty-two' uid='uid' />)
    expect(wrapper.find('.forty-two').length).toBe(1)
  })
})
