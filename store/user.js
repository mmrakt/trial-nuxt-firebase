import { firestoreAction } from 'vuexfire'
// import Cookies from 'js-cookies'
import { firebase, userRef } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    users: [],
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
      state.isLogin = true
      state.data.name = user.displayName
      state.data.email = user.email
      state.data.uid = user.uid
      state.data.birthday = user.birthday
    },
    deleteUser(state) {
      state.isLogin = false
      state.data.name = ''
      state.data.email = ''
      state.data.uid = ''
      state.data.birthday = ''
    },
  },
  actions: {
    init: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('users', userRef)
    }),
    set(context) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          context.commit('setUser', user)
        }
      })
    },
    delete(context) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          context.commit('deleteUser')
        }
      })
    },
    signup: firestoreAction((context, { userId, email, birthday }) => {
      userRef.add({
        id: userId,
        email,
        birthday,
      })
      this.set()
    }),
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
