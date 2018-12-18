/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import Main from './Main'
import CreateNote from '../CreateNote/CreateNote'

describe('Main', () => {
  it('renders create-note button', () => {
    const wrapper = shallow(<Main uid='uid' />)

    expect(wrapper.find(CreateNote).length).toBe(1)
  })
})
