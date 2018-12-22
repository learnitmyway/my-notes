import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

import './Note.css'

export default function Note (props) {
  function handleTitleChange (e) {
    props.onTitleChange(e.target.value)
  }

  function handleBodyChange (e) {
    props.onBodyChange(e.target.value)
  }

  let classNames = 'Note '
  if (props.classNames) {
    classNames += props.classNames
  }

  const shouldRenderTitle = props.note && (props.note.title || props.note.title === '')
  const shouldRenderBody = props.note && (props.note.body || props.note.body === '')

  return (
    <div className={classNames}>
      {shouldRenderTitle && <ContentEditable className='Note-title'
        html={props.note.title}
        onChange={handleTitleChange}
      />}
      {shouldRenderBody && <ContentEditable className='Note-body'
        html={props.note.body}
        onChange={handleBodyChange}
      />}
      {props.isError && <div className='Note-error'>Note cannot be found</div>}
    </div>
  )
}

Note.propTypes = {
  classNames: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  note: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }).isRequired,
  onBodyChange: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired
}
