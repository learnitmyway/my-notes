/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Main from './Main'
import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

describe('Main', () => {
  it('renders create-note component', () => {
    const wrapper = shallow(<Main uid='uid' />)

    expect(wrapper.find(CreateNote).length).toBe(1)
  })

  it('renders note list', () => {
    const wrapper = shallow(<Main uid='uid' />)

    expect(wrapper.find(NoteList).length).toBe(1)
  })
})
