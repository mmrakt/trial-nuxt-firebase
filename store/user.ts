import Cookies from 'js-cookie'
import { firestoreAction } from 'vuexfire'
import { firebase, fbStorage, userRef } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    uid: null,
    user: null,
  },
  mutations: {
    setUid(state, payload) {
      state.uid = payload
    },
  },
  /* eslint-disable */
  actions: {
    usersBind: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('users', userRef)
    }),
    usersUnbind: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('users', userRef)
    }),
    loginUserBind: firestoreAction(({ bindFirestoreRef }, uid) => {
      bindFirestoreRef('user', userRef.doc(uid))
    }),
    loginUserUnbind: firestoreAction(({ unbindFirestoreRef }, uid) => {
      unbindFirestoreRef('user')
    }),
    async login({ state, context, commit, dispatch }) {
      const loginUser = await firebase.auth().currentUser!
      const storeUser = state.users.find((user) => user.uid === loginUser.uid) // 追加情報を取得
      const userBio = 'bio' in storeUser ? storeUser.bio : ''
      const token = await loginUser.getIdToken(true) // ユーザー情報や有効期限情報を含んだJWTを取得
      const userInfo = {
        name: loginUser.displayName,
        email: loginUser.email,
        avatar: loginUser.photoURL,
        uid: loginUser.uid,
        bio: userBio,
      }

      Cookies.set('access_token', token) // JWTをセット
      await commit('setUid', userInfo.uid)
      await dispatch('loginUserBind', userInfo.uid) // userをバインド
    },
    async logout({ commit, dispatch }) {
      await firebase.auth().signOut()
      Cookies.remove('access_token')
      commit('setUid', null)
      dispatch('loginUserUnbind')
    },
    updateProfile({ state, dispatch }, payload) {
      firebase.auth().currentUser!.updateProfile({
        displayName: payload.name,
      })
      userRef.doc(payload.uid).set(
        {
          name: payload.name,
          bio: payload.bio,
        },
        {
          merge: true,
        }
      )
      dispatch('loginUserBind', state.uid)
    },
    // cloud storageに画像を保存
    uploadAvatar({ dispatch }, payload) {
      fbStorage
        .ref()
        .child('images/' + payload.name)
        .put(payload.file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((avatar) => {
            dispatch('updateAvatar', avatar)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // firestoreとvuexのavatarを更新
    updateAvatar({ state, dispatch }, avatar) {
      firebase.auth().currentUser!.updateProfile({
        photoURL: avatar,
      })
      userRef.doc(state.uid).set(
        {
          avatar,
        },
        {
          merge: true,
        }
      )
      dispatch('loginUserBind', state.uid)
    },
  },
  /* eslint-enable */
  getters: {
    getUid(state) {
      if (state.user && state.user.uid) {
        return state.user.uid
      } else {
        return null
      }
    },
    getLoginUser: (state) => {
      return state.user
    },
    getUser: (state) => (uid) => {
      return state.users.find((user) => user.uid === uid)
    },
    getUsers: (state) => {
      return state.users
    },
    isAuthenticated(state) {
      return !!state.user && !!state.uid
    },
  },
}
