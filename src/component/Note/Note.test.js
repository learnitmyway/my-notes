/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import ContentEditable from 'react-contenteditable'

import Note from './Note'
import { readNote } from '../../service/noteService/noteService'

jest.mock('../../service/noteService/noteService')

describe('Note', () => {
  const initialProps = {
    isError: false,
    match: {params: {noteId: 'noteId'}},
    note: {title: 'title', body: 'body'},
    onTitleChange: jest.fn(),
    onBodyChange: jest.fn(),
    uid: 'uid'
  }

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

    const wrapper = shallow(<Note {...initialProps} />)

    expect(wrapper.find(ContentEditable).at(0).props().html).toBe(note.title)
    expect(wrapper.find(ContentEditable).at(1).props().html).toBe(note.body)
    expect(wrapper.find('.Note-error').length).toBe(0)
  })

  it('renders empty note when there is no note', () => {
    const wrapper = shallow(<Note {...initialProps} note={{}} />)

    expect(wrapper.find(ContentEditable).length).toBe(0)
    expect(wrapper.find('.Note-error').length).toBe(0)
  })

  it('renders error', () => {
    const wrapper = shallow(<Note {...initialProps} isError />)

    expect(wrapper.find('.Note-error').text()).toBe('Note cannot be found')
  })

  it('applies class names from props', () => {
    const wrapper = shallow(<Note {...initialProps} classNames='forty-two' />)

    expect(wrapper.find('.forty-two').length).toBe(1)
  })

  it('handles title change', () => {
    const handleTitleChange = jest.fn()
    const wrapper = shallow(<Note {...initialProps} onTitleChange={handleTitleChange} />)

    const newTitle = 'new title'
    wrapper.find(ContentEditable).at(0).props().onChange({target: {value: newTitle}})

    expect(handleTitleChange).toHaveBeenCalledWith(newTitle)
  })

  it('handles body change', () => {
    const handleBodyChange = jest.fn()
    const wrapper = shallow(<Note {...initialProps} onBodyChange={handleBodyChange} />)

    const newBody = 'new body'
    wrapper.find(ContentEditable).at(1).prop('onChange')({target: {value: newBody}})

    expect(handleBodyChange).toHaveBeenCalledWith(newBody)
  })
})
