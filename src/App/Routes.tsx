import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Container from '../Container/Container'
import Feedback from '../Feedback/Feedback'

export interface Props {
  uid: string
}

export default function Routes(props: Props) {
  return (
    <>
      <Switch>
        <Route exact={true} path="/feedback" component={Feedback} />
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
      </Switch>
    </>
  )
}
