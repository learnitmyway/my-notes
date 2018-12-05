import firebase from '../../firebase'
import 'firebase/database'

export function createNote (uid, noteId) {
  const newNoteRef = getNoteRef(uid, noteId)
  newNoteRef.set({
    title: 'untitled',
    body: noteId
  })
}

export function readNote (uid, noteId) {
  const noteRef = getNoteRef(uid, noteId)
  return noteRef.once('value')
}

function getNoteRef (uid, noteId) {
  return firebase.database().ref(`/notes/${uid}/${noteId}`)
}
