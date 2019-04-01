import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import CreateNote from '../CreateNote/CreateNote'
import NoteList from '../NoteList/NoteList'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  height: 100%

  ${props => props.notSmall && css`
    flex: 1;
  `}
`

export default function Main (props) {
  return (
    <Wrapper {...props}>
      <CreateNote uid={props.uid} />
      <NoteList uid={props.uid} match={props.match} currentNote={props.currentNote} />
    </Wrapper>
  )
}

Main.propTypes = {
  currentNote: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  }),
  notSmall: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired
}
