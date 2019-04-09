import React from 'react'
import { Route } from 'react-router-dom'

import Container from '../Container/Container'

export interface Props {
  uid: string
}

export default function Routes(props: Props) {
  return (
    <>
      <Route
        exact={true}
        path="/"
        render={routeProps => <Container {...routeProps} uid={props.uid} />}
      />
      <Route
        exact={true}
        path="/:noteId"
        render={routeProps => <Container {...routeProps} uid={props.uid} />}
      />
    </>
  )
}
