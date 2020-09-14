import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
  // firebase構成オブジェクト
  apiKey: 'AIzaSyC6qBEhqet5sCNRw_Dm-7FEfNPPSaHhLRU',
  authDomain: 'sample-4343c.firebaseapp.com',
  databaseURL: 'https://sample-4343c.firebaseio.com',
  projectId: 'sample-4343c',
  storageBucket: 'sample-4343c.appspot.com',
  messagingSenderId: '517839382746',
  appId: '1:517839382746:web:44c1f4bc432554b7751de3',
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const loginUser = firebase.auth().currentUser
const userRef = db.collection('users')
const postRef = db.collection('posts')
const likeRef = db.collection('likes')
const relationRef = db.collection('relations')
const googleProvider = new firebase.auth.GoogleAuthProvider()
const fbStorage = firebase.storage()

export {
  firebase,
  db,
  loginUser,
  postRef,
  userRef,
  likeRef,
  relationRef,
  googleProvider,
  fbStorage,
}
