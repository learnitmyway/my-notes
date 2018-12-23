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

  it('renders main and note components for larger screen widths', () => {
    window.innerWidth = 600
    const match = {params: {noteId: 'some note id'}}
    const wrapper = shallow(<Container uid='some uid' match={match} />)

    const mainComponentProps = wrapper.find(Main).props()
    expect(mainComponentProps.classNames).toBe('Main--not-small')
    expect(mainComponentProps.match).toBe(match)
    expect(wrapper.find(Note).props().classNames).toBe('Note--not-small')
  })

  it('passes current note as prop on note title change', () => {
    const noteId = 'noteId'
    const match = {params: {noteId}}
    const wrapper = shallow(<Container uid='some uid' match={match} />)

    const newTitle = 'new title'
    const currentNote = {id: noteId, title: newTitle}
    wrapper.find(Note).props().onTitleChange(currentNote)

    expect(wrapper.find(Main).props().currentNote).toBe(currentNote)
  })
})
