import { vuexfireMutations } from 'vuexfire'
import { getUserFromCookie } from '@/helpers'

export const mutations = {
  ...vuexfireMutations,
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const user = getUserFromCookie(req) // JWTをデコードしたトークンを取得
    if (user) {
      await dispatch('user/setUser', {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        uid: user.user_id,
      })
    }
  },
}
