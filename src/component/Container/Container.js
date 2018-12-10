import React from 'react'
import PropTypes from 'prop-types'

import Note from '../Note/Note'
import CreateNote from '../CreateNote/CreateNote'

import deviceWidths from '../../deviceWidths'

import './Container.css'

export default function Container (props) {
  const largerScreenContainer = (
    <div className='Container--not-small'>
      <CreateNote classNames='CreateNote--not-small' uid={props.uid} />
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
