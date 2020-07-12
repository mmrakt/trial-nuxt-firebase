<template>
  <div>
    <br />
    <br />
    <br />
    <table>
      <tbody>
        <tr>
          <th>-</th>
          <th>done</th>
          <th>session_id</th>
          <th>url</th>
          <th>remove</th>
        </tr>
        <tr v-for="status in statuses" :key="status.id">
          <td>
            <input
              type="checkbox"
              :checked="status.done"
              @click="toggle(status.id)"
            />
          </td>

          <td>{{ status.done }}</td>
          <td>{{ status.session_id }}</td>
          <td>
            <a :href="status.url">{{ status.url }}</a>
          </td>
          <td>
            <button @click="remove()">remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      session_id: '',
      url: '',
      done: false,
    }
  },
  computed: {
    statuses() {
      // return this.$store.state.status.statuses
      return this.$store.getters['status/orderedStatus']
    },
  },
  created() {
    this.$store.dispatch('status/init')
  },
  methods: {
    remove(id) {
      this.$store.dispatch('status/remove', id)
    },
    toggle(id) {
      this.$store.dispatch('status/toggle', id)
    },
  },
}
</script>
