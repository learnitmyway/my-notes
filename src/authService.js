import firebase from 'firebase/app'
import 'firebase/auth'

export function signInAnonymously () {
  return firebase.auth().signInAnonymously()
}
