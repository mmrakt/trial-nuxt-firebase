import { firestoreAction } from 'vuexfire'
import { firebase, userRef } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    users: [],
    isLogin: false,
    data: {
      id: '',
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
      state.data.photo = user.photoURL
    },
    deleteUser(state) {
      state.isLogin = false
      state.data.name = ''
      state.data.email = ''
      state.data.uid = ''
      state.data.photo = ''
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
    register: firestoreAction((userData) => {
      userRef.add({
        id: userData.userId,
        birthday: userData.birthday,
        email: userData.email,
      })
    }),
  },
}
