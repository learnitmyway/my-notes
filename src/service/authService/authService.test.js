/* eslint-env jest */

import firebase from 'firebase/app'

import { signInAnonymously } from './authService'

describe('authService', () => {
  it('signs in anonymously', async () => {
    const userCredential = { uid: 'some uid' }
    const signInAnonymouslyMock = jest.fn(() => Promise.resolve(userCredential))
    jest.spyOn(firebase, 'auth').mockImplementation(() => {
      return {
        signInAnonymously: signInAnonymouslyMock
      }
    })

    expect(await signInAnonymously()).toBe(userCredential)
  })
})
