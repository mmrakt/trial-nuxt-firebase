<template>
  <div>
    <v-card width="600px" class="mx-auto my-3">
      <v-card-title class="blue lighten-2">Time line</v-card-title>
      <ul v-for="(post, index) in posts" :key="index" class="pl-0">
        <v-row no-gutters class="px-1 pt-5">
          <v-col cols="1">
            <v-icon size="50">mdi-account-circle</v-icon>
          </v-col>
          <v-col cols="11">
            <v-card-subtitle class="py-2">
              {{ user(post.userId) }}
              <span class="ml-3"></span>
              {{ formated(post.createdAt) }}
            </v-card-subtitle>
            <v-card-text class="py-2">
              <strong>{{ post.title }}</strong>
            </v-card-text>
            <v-card-text class="py-2">{{ post.content }}</v-card-text>
            <v-card-actions class="py-0">
              <v-list-item>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-icon v-if="!post.liked" @click="like(post.id)">
                    mdi-heart
                  </v-icon>
                  <v-icon v-else color="red lighten-2" @click="unlike(post.id)">
                    mdi-heart
                  </v-icon>
                  <v-spacer></v-spacer>
                  <v-icon @click="open(post.id, index)">mdi-pencil</v-icon>
                  <v-spacer></v-spacer>
                  <v-icon>mdi-upload</v-icon>
                  <v-spacer></v-spacer>
                  <v-icon left right @click="remove(post.id)">
                    mdi-delete
                  </v-icon>
                  <v-spacer></v-spacer>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-col>
        </v-row>
        <hr />
      </ul>
    </v-card>
  </div>
</template>

<script>
import { moment } from '@/plugins/moment-filter'

export default {
  computed: {
    posts() {
      return this.$store.getters['post/getPosts']
    },
    user() {
      return function (userId) {
        return this.$store.getters['user/getUser'](userId)
      }
    },
    formated() {
      return function (createdAt) {
        return moment(createdAt.seconds * 1000).format('YYYY-MM-DD')
      }
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
