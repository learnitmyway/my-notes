/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Editor from './Editor'
import Note from './Note'
import CreateNote from './CreateNote'

describe('Main', () => {
  it('renders note component', () => {
    const match = {params: {noteId: 'some note id'}}
    const wrapper = shallow(<Editor uid='some uid' match={match} />)
    expect(wrapper.find(Note).length).toBe(1)
  })

  it('renders create note and note components for larger screen widths', () => {
    window.innerWidth = 600
    const match = {params: {noteId: 'some note id'}}
    const wrapper = shallow(<Editor uid='some uid' match={match} />)

    expect(wrapper.find(CreateNote).length).toBe(1)
    expect(wrapper.find(Note).length).toBe(1)
  })
})
