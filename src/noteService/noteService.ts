import 'firebase/database'
import firebase from '../firebase'

import { log } from '../errorService'

export function createNote(uid: string, noteId: string) {
  const newNoteRef = getNoteRef(uid, noteId)
  newNoteRef
    .set({
      body: 'click to edit',
      title: 'click to edit'
    })
    .catch(err => log(`Cannot create note: /notes/${uid}/${noteId}`, err))
}

export function readNote(
  uid: string,
  noteId: string,
  successCallback: any,
  failureCallback: any
) {
  const noteRef = getNoteRef(uid, noteId)
  noteRef.once('value', successCallback, failureCallback)
}

export function readAllNotes(
  uid: string,
  successCallback: any,
  failureCallback: any
) {
  const noteRef = firebase.database().ref(`/notes/${uid}`)
  noteRef.once('value', successCallback, failureCallback)
}

export function updateNote(
  uid: string,
  noteId: string,
  title: string,
  body: string
) {
  const noteRef = getNoteRef(uid, noteId)
  noteRef.update({ title, body })
}

export function deleteNote(uid: string, noteId: string) {
  const noteRef = getNoteRef(uid, noteId)
  return noteRef.remove()
}

function getNoteRef(uid: string, noteId: string) {
  return firebase.database().ref(`/notes/${uid}/${noteId}`)
}
