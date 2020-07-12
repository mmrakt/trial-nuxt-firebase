<template>
  <v-content>
    <v-card width="600px" class="mx-auto my-5">
      <v-form ref="form" class="pa-5">
        <label for="name">
          なまえ:
          <v-text-field v-model="name" name="name" type="text" />
        </label>
        <label>
          <span>つぶやき:</span>
          <v-text-field v-model="content" type="text" />
        </label>
        <v-btn color="primary" @click="add">つぶやく</v-btn>
      </v-form>
    </v-card>
    <ul v-for="(post, index) in postList" :key="index" class="p-0">
      <v-card width="600px" class="mx-auto my-3">
        <v-card-text>{{ post.content }}</v-card-text>
      </v-card>
    </ul>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      content: '',
      date: null,
      newContent: '',
    }
  },
  computed: {
    postList() {
      return this.$store.getters['post/postList']
    },
  },
  mounted() {
    this.$store.dispatch('post/postInit')
  },
  methods: {
    add() {
      const postData = {
        username: this.name,
        content: this.content,
      }
      this.$store.dispatch('post/add', postData)
      this.name = ''
      this.content = ''
    },
  },
}
</script>
