import firebase from './firebase'
import 'firebase/database'

export function createNote (uid) {
  const userNotesRef = firebase.database().ref(`/notes/${uid}/`)
  const newNoteRef = userNotesRef.push()
  newNoteRef.set({
    title: 'untitled',
    body: ''
  })
}
