<template>
  <v-card width="600px" class="mx-auto my-5">
    <v-card-title class="blue lighten-2">Post form</v-card-title>
    <v-form ref="form" class="px-5">
      <v-text-field v-model="title" label="Title" name="title" type="text" />
      <v-text-field v-model="content" label="Message" type="text" />
    </v-form>
    <v-card-actions class="pt-0 pb-5 pr-5">
      <v-spacer></v-spacer>
      <v-icon>mdi-image-plus</v-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-gif</v-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-baby-face-outline</v-icon>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        style="text-transform: none;"
        @click="add(user.name)"
      >
        Post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      content: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
  },
  methods: {
    add(name) {
      this.$store.dispatch('post/add', {
        name,
        title: this.title,
        content: this.content,
      })
      this.title = ''
      this.content = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
