/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Editor from './Editor'
import Note from './Note'

describe('Main', () => {
  it('renders note component', () => {
    const wrapper = shallow(<Editor />)
    expect(wrapper.find(Note).length).toBe(1)
  })
})
