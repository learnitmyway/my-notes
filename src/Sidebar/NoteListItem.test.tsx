import React from 'react'
import { waitForElement } from '@testing-library/react'

import { renderWithRouter } from '../testUtils/renderWithRouter'

import NoteListItem from './NoteListItem'

describe('NoteListItem', () => {
  it('renders link to note', async () => {
    const noteId = 'noteId'
    const title = 'title'
    const { getByText } = renderWithRouter(
      <NoteListItem isSelected title={title} noteId={noteId} />
    )
    const link = await waitForElement(() => getByText(title))

    expect(link).toHaveAttribute('href', '/' + noteId)
  })
})
