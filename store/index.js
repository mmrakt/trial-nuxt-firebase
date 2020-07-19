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
        name: user.name,
        email: user.email,
        avator: user.picture,
        uid: user.user_id,
      })
    }
  },
}
