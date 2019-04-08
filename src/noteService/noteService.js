import 'firebase/database'
import firebase from '../firebase'

import { log } from '../errorService'

export function createNote(uid, noteId) {
  const newNoteRef = getNoteRef(uid, noteId)
  newNoteRef
    .set({
      title: 'click to edit',
      body: 'click to edit'
    })
    .catch(err => log(`Cannot create note: /notes/${uid}/${noteId}`, err))
}

export function readNote(uid, noteId, successCallback, failureCallback) {
  const noteRef = getNoteRef(uid, noteId)
  noteRef.once('value', successCallback, failureCallback)
}

export function readAllNotes(uid, successCallback, failureCallback) {
  const noteRef = firebase.database().ref(`/notes/${uid}`)
  noteRef.once('value', successCallback, failureCallback)
}

export function updateNote(uid, noteId, title, body) {
  const noteRef = getNoteRef(uid, noteId)
  noteRef.update({ title, body })
}

function getNoteRef(uid, noteId) {
  return firebase.database().ref(`/notes/${uid}/${noteId}`)
}
