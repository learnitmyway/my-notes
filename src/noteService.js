import firebase from './firebase'
import 'firebase/database'

export function createNote (uid) {
  firebase.database().ref().child(`/notes/${uid}/`).push()
}
