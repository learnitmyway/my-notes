import firebase from '../../firebase'
import 'firebase/database'

export function createNote (uid, noteId) {
  const newNoteRef = getNoteRef(uid, noteId)
  newNoteRef.set({
    title: 'untitled',
    body: noteId
  })
    .catch(err => console.error(`Cannot create note: /notes/${uid}/${noteId}`, err))
}

export function readNote (uid, noteId, successCallback, failureCallback) {
  const noteRef = getNoteRef(uid, noteId)
  noteRef.once('value', successCallback, failureCallback)
}

function getNoteRef (uid, noteId) {
  return firebase.database().ref(`/notes/${uid}/${noteId}`)
}
