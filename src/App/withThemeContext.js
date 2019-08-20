import React from 'react'
import { ThemeContext } from './Context'

export default function withThemeContext(WrappedComponent) {
  return class extends React.Component {
    static contextType = ThemeContext
    render() {
      const themeContext = this.context
      const props = {
        themeContext,
        ...this.props
      }
      return <WrappedComponent {...props} />
    }
  }
}
