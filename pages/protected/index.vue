<template>
  <v-content>
    <post-form />
    <post-list />
  </v-content>
</template>

<script lang="ts">
import postForm from '@/components/postForm.vue'
import postList from '@/components/postList.vue'

export default {
  layout: 'protected',
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
