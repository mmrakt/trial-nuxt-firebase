import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import post from './post'
import auth from './auth'
import status from './status'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      post,
      auth,
      status,
    },
    mutations: {
      ...vuexfireMutations,
    },
  })
}

export default store
