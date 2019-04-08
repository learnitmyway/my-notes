import React from 'react'
import { Route } from 'react-router-dom'

import Container from '../Container/Container'
import Sidebar from '../Sidebar/Sidebar'

import deviceWidths from '../deviceWidths'

export interface Props {
  uid: string
}

export default function Routes(props: Props) {
  function renderRootPath(routeProps: any) {
    return window.innerWidth < deviceWidths.small ? (
      <Sidebar {...routeProps} open={true} small={true} uid={props.uid} />
    ) : (
      <Container {...routeProps} uid={props.uid} />
    )
  }

  return (
    <>
      <Route exact={true} path="/" render={renderRootPath} />
      <Route
        exact={true}
        path="/:noteId"
        render={routeProps => <Container {...routeProps} uid={props.uid} />}
      />
    </>
  )
}
