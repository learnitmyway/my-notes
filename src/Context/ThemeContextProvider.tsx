import React from 'react'
import { getTheme } from './uiSettingsService'
import { ThemeContext, Theme, defaultTheme } from './Context'

interface Props {
  children?: React.ReactNode
}

interface State {
  theme: Theme
  loaded: boolean
}

export default class ThemeContextProvider extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = {
      theme: defaultTheme,
      loaded: false
    }
  }

  async componentDidMount() {
    const theme: Theme = await getTheme()
    this.setState({ theme, loaded: true })
  }

  render() {
    const { children } = this.props
    const { loaded } = this.state

    return (
      <ThemeContext.Provider value={this.state.theme}>
        {loaded && children}
      </ThemeContext.Provider>
    )
  }
}
