import firebase from './firebase'
import 'firebase/database'

export function createNote (uid, noteId) {
  const newNoteRef = getNoteRef(uid, noteId)
  newNoteRef.set({
    title: 'untitled',
    body: ''
  })
}

export function readNote (uid, noteId, cb) {
  const noteRef = getNoteRef(uid, noteId)
  noteRef.once('value', cb)
}

function getNoteRef (uid, noteId) {
  return firebase.database().ref(`/notes/${uid}/${noteId}`)
}
