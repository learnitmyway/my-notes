import React from 'react'

export const defaultTheme = {
  primaryColor: 'hsl(0, 0%, 90%)'
}

export interface Theme {
  primaryColor: string
}

export const ThemeContext = React.createContext(defaultTheme)
