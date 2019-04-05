import React from 'react'
import { render } from 'react-testing-library'

import NavigationBar from './NavigationBar'

describe('NavigationBar', () => {
  it('renders', () => {
    const { container } = render(<NavigationBar />)

    expect(container.querySelector('nav')).not.toBeNull()
  })
})
