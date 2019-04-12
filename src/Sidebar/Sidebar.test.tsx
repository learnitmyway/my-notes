import React from 'react'
import { fireEvent } from 'react-testing-library'
import { renderWithRouter } from '../testUtils/renderWithRouter'

import styles from './Sidebar.module.css'
import Sidebar from './Sidebar'

const defaultProps = {
  match: { params: { noteId: 'noteId' } }
}

describe('Sidebar', () => {
  describe('for small devices', () => {
    beforeEach(() => {
      window.innerWidth = 599
    })

    it('displays sidebar', () => {
      const { getByTestId } = renderWithRouter(<Sidebar {...defaultProps} />)

      expect(getByTestId('Sidebar')).toHaveClass(
        `${styles.root} ${styles.small} ${styles.open}`
      )
    })

    it('shows and hides sidebar when arrows are clicked', () => {
      const { getByTestId, getByAltText } = renderWithRouter(
        <Sidebar {...defaultProps} />
      )

      expect(getByTestId('Sidebar')).toHaveClass(`${styles.open}`)

      fireEvent.click(getByAltText('left arrow'))

      expect(getByTestId('Sidebar')).not.toHaveClass(`${styles.open}`)

      fireEvent.click(getByAltText('right arrow'))

      expect(getByTestId('Sidebar')).toHaveClass(`${styles.open}`)
    })
  })

  describe('for large devices', () => {
    beforeEach(() => {
      window.innerWidth = 600
    })

    it('displays sidebar', () => {
      const { getByTestId } = renderWithRouter(<Sidebar {...defaultProps} />)

      expect(getByTestId('Sidebar')).toHaveClass(
        `${styles.root} ${styles.notSmall} ${styles.open}`
      )
    })

    it('does not display arrows', () => {
      const { queryByAltText } = renderWithRouter(<Sidebar {...defaultProps} />)

      expect(queryByAltText('left arrow')).toBeNull()
      expect(queryByAltText('right arrow')).toBeNull()
    })
  })
})
