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
      const postId = v4()
      postRef.doc(postId).set({
        id: postId,
        uid,
        title,
        content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }),
    remove: firestoreAction((context, id) => {
      likeRef
        .where('postId', '==', id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete()
          })
        })
      postRef.doc(id).delete()
    }),
    like: firestoreAction((context, post) => {
      likeRef.doc(firebase.auth().currentUser!.uid + post.id).set({
        uid: firebase.auth().currentUser!.uid,
        postId: post.id,
      })
      postRef.doc(post.id).update({
        likeIds: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser!.uid + post.id
        ),
      })
    }),
    unlike: firestoreAction((context, post) => {
      likeRef.doc(firebase.auth().currentUser!.uid + post.id).delete()
      postRef.doc(post.id).update({
        likeIds: firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser!.uid + post.id
        ),
      })
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
