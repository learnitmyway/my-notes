/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import NoteListItem from './NoteListItem'

describe('NoteListItem', () => {
  it('renders note title', () => {
    const title = 'title'
    const wrapper = shallow(
      <NoteListItem title={title} noteId="noteId" isSelected={false} />
    )

    expect(wrapper.find('.NoteListItem-title').text()).toBe(title)
    expect(wrapper.find('.NoteListItem--selected').length).toBe(0)
  })

  it('navigates to note on click', () => {
    const noteId = 'noteId'

    const wrapper = shallow(
      <NoteListItem title="title" noteId={noteId} isSelected={false} />
    )

    expect(wrapper.find('.NoteListItem').props().to).toBe('/' + noteId)
  })

  it('applies styles when selected', () => {
    const wrapper = shallow(
      <NoteListItem title="title" noteId="noteId" isSelected />
    )

    expect(wrapper.find('.NoteListItem--selected').length).toBe(1)
  })
})
