import * as Sentry from '@sentry/browser'
import React from 'react'

// Sentry.init({
//  dsn: "https://4a64214ebae043ef85a91db67ea520fb@sentry.io/1430547"
// });
// should have been called before using it here
// ideally before even rendering your react app

export default class ExampleBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
    } else {
      //when there's not an error, render children untouched
      return this.props.children
    }
  }
}
