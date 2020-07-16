<template>
  <div>
    <ul v-for="(post, index) in postList" :key="index" class="p-0">
      <v-card width="600px" class="mx-auto my-3">
        <v-card-text v-if="post.editFlag">
          <v-text-field
            ref="input"
            v-model="newContent"
            type="text"
            @keyup.enter="update(post.id)"
            @blur="close(post.id)"
          />
        </v-card-text>
        <v-card-text v-else>{{ post.content }}</v-card-text>
        <v-card-actions>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ post.name }}</v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-content>
              <v-list-item-title>{{ post.createdAt }}</v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-row right>
              <v-icon v-if="!post.liked" @click="like(post.id)">
                mdi-heart
              </v-icon>
              <v-icon v-else color="red lighten-2" @click="unlike(post.id)">
                mdi-heart
              </v-icon>
              <div class="mx-2"></div>
              <v-icon @click="open(post.id, index)">mdi-pencil</v-icon>
              <div class="mx-2"></div>
              <v-btn class="float-right" right @click="remove(post.id)">
                <v-icon left>mdi-delete</v-icon>
                削除
              </v-btn>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    postList() {
      return this.$store.getters['post/postList']
    },
  },
  methods: {
    remove(postId) {
      this.$store.dispatch('post/remove', postId)
    },
    like(postId) {
      this.$store.dispatch('post/like', postId)
    },
    unlike(postId) {
      this.$store.dispatch('post/unlike', postId)
    },
  },
}
</script>

<style lang="scss" scoped></style>
