import firebase from './firebase'
import 'firebase/database'

export function createNote (uid, noteId) {
  const newNoteRef = firebase.database().ref(`/notes/${uid}/${noteId}`)
  newNoteRef.set({
    title: 'untitled',
    body: ''
  })
}
