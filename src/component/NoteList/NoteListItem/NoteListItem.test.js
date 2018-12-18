/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import NoteListItem from './NoteListItem'

describe('NoteListItem', () => {
  it('renders note title', () => {
    const title = 'title'
    const wrapper = shallow(<NoteListItem title={title} />)

    expect(wrapper.find('.NoteListItem-title').text()).toBe(title)
  })
})
