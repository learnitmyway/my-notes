import React from 'react'
import PropTypes from 'prop-types'

import Note from '../Note/Note'
import Main from '../Main/Main'

import deviceWidths from '../../deviceWidths'

import './Container.css'

export default function Container (props) {
  const largerScreenContainer = (
    <div className='Container Container--not-small'>
      <Main classNames='Main--not-small' uid={props.uid} match={props.match} />
      <Note classNames='Note--not-small' {...props} />
    </div>
  )
  return (
    window.innerWidth < deviceWidths.small
      ? <Note {...props} />
      : largerScreenContainer
  )
}

Container.propTypes = {
  uid: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    })
  }).isRequired
}
