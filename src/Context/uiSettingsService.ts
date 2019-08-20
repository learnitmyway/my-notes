import 'firebase/database'
import firebase from '../firebase'
import { defaultTheme } from './Context'

export async function getTheme() {
  let theme = defaultTheme
  function successCallback(snapshot: any) {
    const val = snapshot.val()
    if (val) theme = val
  }

  await firebase
    .database()
    .ref(`/uiSettings/theme`)
    .once('value', successCallback)

  return theme
}
