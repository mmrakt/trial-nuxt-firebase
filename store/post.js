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
    add: firestoreAction((context, { userId, title, content }) => {
      postRef.add({
        userId,
        title,
        content,
        editFlag: false,
        liked: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
    getPosts: (state) => {
      return state.posts
    },
  },
}
