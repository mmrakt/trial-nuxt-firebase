import { firestoreAction } from 'vuexfire'
import { v4 } from 'uuid'
import { firebase, postRef, likeRef } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    posts: [],
    likes: [],
  },
  /* eslint-disable */
  actions: {
    postInit: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('posts', postRef)
    }),
    likeInit: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('likes', likeRef)
    }),
    add: firestoreAction((context, { uid, title, content }) => {
      postRef.add({
        uid,
        title,
        content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }),
    remove: firestoreAction((context, id) => {
      postRef.doc(id).delete()
    }),
    like: firestoreAction((context, post) => {
      const likeId = v4()
      likeRef.doc(likeId).set({
        uid: firebase.auth().currentUser!.uid,
        postId: post.id,
      })
    }),
    unlike: firestoreAction((context, post) => {
      likeRef.doc(post.id).delete()
    }),
  },
  /* eslint-enable */
  getters: {
    getPosts: (state): [] => {
      return state.posts
    },
    getUserPost: (state) => (uid): {} => {
      return state.posts.filter((post) => post.uid === uid)
    },
    getlikes: (state) => {
      return state.likes.filter(
        (like) => like.uid === firebase.auth().currentUser!.uid
      )
    },
  },
}
