import Cookies from 'js-cookie'
import { firestoreAction } from 'vuexfire'
import { firebase, fbStorage, userRef } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    uid: null,
    user: null,
    users: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setUid(state, payload) {
      state.uid = payload
    },
    setUserAvatar(state, payload) {
      state.user.avatar = payload
    },
    setUserBio(state, payload) {
      state.user.bio = payload
    },
    setUserName(state, payload) {
      state.user.name = payload
    },
  },
  /* eslint-disable */
  actions: {
    userInit: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('users', userRef)
    }),
    async login({ state, context, commit }) {
      const loginUser = await firebase.auth().currentUser!
      const storeUser = state.users.find((user) => user.uid === loginUser.uid) // 追加情報を取得
      const userBio = 'bio' in storeUser ? storeUser.bio : ''

      const userInfo = {
        name: loginUser.displayName,
        email: loginUser.email,
        avatar: loginUser.photoURL,
        uid: loginUser.uid,
        bio: userBio,
      }
      const token = await loginUser.getIdToken(true) // ユーザー情報や有効期限情報を含んだJWTを取得

      Cookies.set('access_token', token) // JWTをセット
      await commit('setUser', userInfo)
      await commit('setUid', userInfo.uid)
    },
    async logout({ commit }) {
      await firebase.auth().signOut()

      Cookies.remove('access_token')
      commit('setUser', null)
      commit('setUid', null)
    },
    updateProfile({ commit }, payload) {
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
      commit('setUserName', payload.name)
      commit('setUserBio', payload.bio)
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
    updateAvatar({ state, commit }, avatar) {
      firebase.auth().currentUser!.updateProfile({
        photoURL: avatar,
      })
      userRef.doc(state.user.uid).set(
        {
          avatar,
        },
        {
          merge: true,
        }
      )
      commit('setUserAvatar', avatar)
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
