import Cookies from 'js-cookie'
import { firebase } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    uid: null,
    user: null,
    isLogin: false,
    data: {
      uid: '',
      name: '',
      email: '',
      birthday: '',
    },
  },
  mutations: {
    setUser(state, user) {
      console.log('[STORE MUTATIONS] - setUSER:', user)
      state.user = user
    },
    saveUid(state, uid) {
      console.log('[STORE MUTATIONS] - saveUID:', uid)
      state.uid = uid
    },
  },
  actions: {
    async login({ dispatch, state, context, commit }, user) {
      const loginUser = await firebase.auth().currentUser
      const token = await loginUser.getIdToken(true) // ②-1
      const userInfo = {
        name: loginUser.displayName,
        email: loginUser.email,
        avatar: loginUser.photoURL,
        uid: loginUser.uid,
      }
      Cookies.set('access_token', token)
      await commit('setUser', userInfo)
      await commit('saveUid', userInfo.uid)
    },
    async logout({ commit, dispatch }) {
      console.log('[STORE ACTIONS] - logout')
      await firebase.auth().signOut()

      Cookies.remove('access_token')
      commit('setUser', null)
      commit('saveUid', null)
    },
  },
  getters: {
    uid(state) {
      if (state.user && state.user.uid) {
        return state.user.uid
      } else {
        return null
      }
    },
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return !!state.user && !!state.uid
    },
  },
}
