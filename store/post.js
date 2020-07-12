import { firestoreAction } from 'vuexfire'
import { postRef, firebase } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  actions: {
    // データバインド（同期）
    postInit: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('posts', postRef)
    }),
    add: firestoreAction((postData) => {
      postRef.add({
        name: postData.username,
        content: postData.content,
        editFlag: false,
        liked: false,
        createdAt: firebase.firestore.Timestamp.now(),
      })
    }),
    remove: firestoreAction((id) => {
      postRef.doc(id).delete()
    }),
    open: firestoreAction((postId) => {
      postRef.doc(postId).update({
        editFlag: true,
      })
    }),
    close: firestoreAction((postId) => {
      postRef.doc(postId).update({
        editFlag: false,
      })
    }),
    update: firestoreAction((postData) => {
      postRef.doc(postData.id).update({
        content: postData.newContent,
      })
    }),
    like: firestoreAction((postId) => {
      postRef.doc(postId).update({
        liked: true,
      })
    }),
    unlike: firestoreAction((postId) => {
      postRef.doc(postId).update({
        liked: false,
      })
    }),
  },
  getters: {
    postList: (state) => {
      return state.posts
    },
    getPost: (state) => (postId) => {
      return state.posts.filter((post) => post.id === postId)[0]
    },
  },
}
