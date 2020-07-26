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
    setUid(state, uid) {
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
    update({ commit }, payload) {
      commit('setUser', payload)
      userRef.doc(payload.uid).set(payload)
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
