import React, { Component } from 'react'

export default function ContentEditable(props) {
  return <input value={props.html} {...props} />
}
