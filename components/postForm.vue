<template>
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
</template>

<script>
export default {
  data() {
    return {
      name: '',
      content: '',
    }
  },
  methods: {
    add() {
      this.$store.dispatch('post/add', {
        name: this.name,
        content: this.content,
      })
      this.name = ''
      this.content = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
