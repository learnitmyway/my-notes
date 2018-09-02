import firebase from 'firebase/app'

const config = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`
}
firebase.initializeApp(config)

export default firebase
