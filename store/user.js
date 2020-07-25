import Cookies from 'js-cookie'
import { firestoreAction } from 'vuexfire'
import { firebase, userRef } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    uid: null,
    user: null,
    users: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    saveUid(state, uid) {
      state.uid = uid
    },
    setUserName(state, loginUserName) {
      state.loginUserName = loginUserName
    },
  },
  actions: {
    userInit: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('users', userRef)
    }),
    async login({ state, context, commit }) {
      const loginUser = await firebase.auth().currentUser
      const token = await loginUser.getIdToken(true) // ユーザー情報や有効期限情報を含んだJWTを取得
      const userInfo = {
        name: loginUser.displayName,
        email: loginUser.email,
        avatar: loginUser.photoURL,
        uid: loginUser.uid,
      }
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
    update: (state, payload) => {
      return userRef.doc(payload.uid).update({
        name: payload.name,
        bio: payload.bio,
      })
    },
    fetchUser: (state, uid) => {
      return userRef.doc(uid).get()
    },
  },
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
    getUser: (state) => (userId) => {
      return state.users.find((user) => user.userId === userId)
    },
    getUsers: (state) => {
      return state.users
    },
    isAuthenticated(state) {
      return !!state.user && !!state.uid
    },
  },
}
