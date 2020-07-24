import { firestoreAction } from 'vuexfire'
import { firebase, postRef } from '../plugins/firebase'
// import { moment } from '@/plugins/moment-filter'

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  actions: {
    postInit: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('posts', postRef)
    }),
    add: firestoreAction((context, { name, title, content }) => {
      postRef.add({
        name,
        title,
        content,
        editFlag: false,
        liked: false,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
    }),
    remove: firestoreAction((context, id) => {
      postRef.doc(id).delete()
    }),
    like: firestoreAction((context, postId) => {
      postRef.doc(postId).update({
        liked: true,
      })
    }),
    unlike: firestoreAction((context, postId) => {
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
