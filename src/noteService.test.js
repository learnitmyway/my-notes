/* eslint-env jest */

import firebase from 'firebase/app'

import { createNote } from './noteService'

describe('noteService', () => {
  it('creates a note in the firebase database', () => {
    const push = jest.fn()
    let actualEndpoint
    jest.spyOn(firebase, 'database').mockImplementation(() => {
      return {
        ref: () => {
          return {
            child: endpoint => {
              actualEndpoint = endpoint
              return {
                push
              }
            }
          }
        }
      }
    })

    const uid = '42'
    createNote(uid)

    expect(push).toHaveBeenCalled()
    expect(actualEndpoint).toBe(`/notes/${uid}/`)
  })
})
