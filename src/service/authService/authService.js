import firebase from '../../firebase'
import 'firebase/auth'

export function signInAnonymously () {
  return firebase.auth().signInAnonymously()
}
