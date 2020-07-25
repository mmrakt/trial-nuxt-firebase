<template>
  <v-content>
    <post-form />
    <post-list />
  </v-content>
</template>

<script>
import postForm from '../components/postForm.vue'
import postList from '../components/postList.vue'

export default {
  components: {
    postForm,
    postList,
  },
  created() {
    this.$store.dispatch('post/postInit')
    this.$store.dispatch('user/userInit')
  },
}
</script>
