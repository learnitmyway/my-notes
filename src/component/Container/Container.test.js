/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Container from './Container'
import Note from '../Note/Note'
import Main from '../Main/Main'

describe('Container', () => {
  const initialProps = {
    uid: 'uid',
    match: { params: { noteId: 'noteId' } }
  }

  describe('for small devices', () => {
    beforeEach(() => {
      window.innerWidth = 599
    })

    it('renders', () => {
      const wrapper = shallow(<Container {...initialProps} />)
      expect(wrapper.props().className).toBe('Container')
    })

    it('renders note component', () => {
      const uid = 'uid'
      const match = { params: { noteId: 'note id' } }
      const wrapper = shallow(<Container uid={uid} match={match} />)

      const noteProps = wrapper.find(Note).props()

      expect(noteProps.classNames).toBe(undefined)
      expect(noteProps.match).toBe(match)
      expect(noteProps.uid).toBe(uid)

      expect(wrapper.find(Main).length).toBe(0)
    })
  })

  describe('for large devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })

    it('renders', () => {
      const wrapper = shallow(<Container {...initialProps} />)
      expect(wrapper.props().className).toBe('Container Container--not-small')
    })

    it('renders main and note components', () => {
      const uid = 'uid'
      const match = { params: { noteId: 'note id' } }
      const wrapper = shallow(<Container uid={uid} match={match} />)

      const mainProps = wrapper.find(Main).props()
      expect(mainProps.notSmall).toBe(true)
      expect(mainProps.match).toBe(match)
      expect(mainProps.uid).toBe(uid)

      const noteProps = wrapper.find(Note).props()
      expect(noteProps.classNames).toBe('Note--not-small')
      expect(noteProps.match).toBe(match)
      expect(noteProps.uid).toBe(uid)
    })
  })

  it('passes current note as prop on note title change', () => {
    const noteId = 'noteId'
    const match = { params: { noteId } }
    const wrapper = shallow(<Container uid='uid' match={match} />)

    const newTitle = 'new title'
    const currentNote = { id: noteId, title: newTitle }
    wrapper.find(Note).props().onTitleChange(currentNote)

    expect(wrapper.find(Main).props().currentNote).toBe(currentNote)
  })
})
