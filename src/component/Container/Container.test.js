/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Container from './Container'
import Note from '../Note/Note'
import Main from '../Main/Main'

describe('Container', () => {
  it('renders note component', () => {
    const match = {params: {noteId: 'some note id'}}
    const wrapper = shallow(<Container uid='some uid' match={match} />)
    expect(wrapper.find(Note).length).toBe(1)
  })

  it('renders create note and note components for larger screen widths', () => {
    window.innerWidth = 600
    const match = {params: {noteId: 'some note id'}}
    const wrapper = shallow(<Container uid='some uid' match={match} />)

    expect(wrapper.find(Main).length).toBe(1)
    expect(wrapper.find(Main).props().classNames).toBe('Main--not-small')
    expect(wrapper.find(Note).length).toBe(1)
    expect(wrapper.find(Note).props().classNames).toBe('Note--not-small')
  })
})
