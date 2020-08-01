import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['user'], // localStorageに保存したいstoreを入れる
  })(store)
}
