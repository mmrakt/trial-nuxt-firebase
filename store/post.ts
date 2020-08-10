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
    postsBind: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('posts', postRef)
    }),
    likesBind: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('likes', likeRef)
    }),
    add: firestoreAction((context: any, { title, content }) => {
      const postId = v4()
      const uid = context.rootState.user.uid
      postRef.doc(postId).set({
        id: postId,
        uid,
        title,
        content,
        likeIds: [],
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
    like: firestoreAction((context: any, post) => {
      const uid = context.rootState.user.uid
      likeRef.doc(uid + post.id).set({
        uid: uid,
        postId: post.id,
      })
      postRef.doc(post.id).update({
        likeIds: firebase.firestore.FieldValue.arrayUnion(uid + post.id),
      })
    }),
    unlike: firestoreAction((context: any, post) => {
      const uid = context.rootState.user.uid
      likeRef.doc(uid + post.id).delete()
      postRef.doc(post.id).update({
        likeIds: firebase.firestore.FieldValue.arrayRemove(uid + post.id),
      })
    }),
  },
  getters: {
    getPosts: (state): [] => {
      return state.posts
    },
    getLoginUserPosts: (state) => (uid) => {
      return state.posts.filter((post) => post.uid == uid)
    },
    getlikes: (state, getters, rootState) => {
      const uid = rootState.user.uid
      return state.likes.filter((like) => like.uid === uid)
    },
  },
  /* eslint-enable */
}
