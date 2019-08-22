import React, { useState, useEffect } from 'react'

import Routes from './Routes'
import { signInAnonymously } from './authService'
import { logError } from '../logService'
import withThemeContext from '../Context/withThemeContext'
import { Theme } from '../Context/Context'

interface Props {
  themeContext: Theme
}

export interface State {
  uid: string
  hasError: boolean
}

function App(props: Props) {
  const [uid, setUid] = useState('')
  const [hasError, setError] = useState(false)

  useEffect(() => {
    async function fetchUid() {
      try {
        const userCredentials = await signInAnonymously()
        if (userCredentials.user) {
          setUid(userCredentials.user.uid)
        } else {
          logError({
            description: 'Could not parse uid from user credentials'
          })
        }
      } catch (err) {
        setError(true)
        logError({ error: err, description: 'Sign in failed' })
      }
    }

    fetchUid()
  })

  document.documentElement.style.setProperty(
    '--primary',
    props.themeContext.primaryColor
  )

  if (hasError) {
    return <p> Sign in failed. Please refresh the page and try again.</p>
  } else {
    return uid ? <Routes {...props} uid={uid} /> : null
  }
}

export default withThemeContext(App)
