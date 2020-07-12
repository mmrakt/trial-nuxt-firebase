import { firestoreAction } from 'vuexfire'
import { statusRef } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    statuses: [],
  },
  actions: {
    init: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('statuses', statusRef)
    }),
    remove: firestoreAction(() => {
      statusRef.doc('V4FTn0a8nEh6WiOGbuEq').delete()
    }),
    toggle: firestoreAction((id) => {
      statusRef.doc(id).update({
        done: !status.done,
      })
    }),
  },
  getters: {
    orderedStatus: (state) => {
      return state.statuses
    },
  },
}
