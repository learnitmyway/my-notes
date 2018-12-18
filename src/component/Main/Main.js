import React from 'react'
import CreateNote from '../CreateNote/CreateNote'

export default function Main (props) {
  return (
    <CreateNote uid={props.uid} />
  )
}
