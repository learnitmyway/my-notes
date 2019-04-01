import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import styled from 'styled-components/macro'

import { createNote } from '../../service/noteService/noteService'
import plus from './plus.svg'

const Wrapper = styled.div`
  padding: 1rem;
`

const StyledLink = styled(Link)`
  display: block;
  background-color: #5cb85c;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  margin: auto;

  &:hover {
    background-color: #449d44;
  }
`

StyledLink.displayName = 'MessageText';

const Img = styled.img`
  margin: 1rem;
`

export default function CreateNote (props) {
  function createNoteFrom (noteId) {
    createNote(props.uid, noteId)
  }

  const noteId = uuidv1()

  return (
    <Wrapper>
      <StyledLink onClick={() => createNoteFrom(noteId)} to={'/' + noteId}>
        <Img src={plus} alt='plus sign' />
      </StyledLink>
    </Wrapper>
  )
}

CreateNote.propTypes = {
  uid: PropTypes.string.isRequired
}
