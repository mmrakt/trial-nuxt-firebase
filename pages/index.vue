<template>
  <v-content>
    <post-form />
    <post-list />
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue'
import postForm from '../components/postForm.vue'
import postList from '../components/postList.vue'

export default Vue.extend({
  components: {
    postForm,
    postList,
  },
  created(): void {
    this.$store.dispatch('post/postsBind')
    this.$store.dispatch('user/usersBind')
  },
})
</script>
