<template>
  <div>
    <v-card width="600px" class="mx-auto my-3">
      <v-card-title class="blue lighten-2">Time line</v-card-title>
      <ul v-for="(post, index) in posts" :key="index" class="pl-0">
        <v-row no-gutters class="px-1 pt-5">
          <v-col v-if="user(post.uid)" cols="1">
            <template v-if="user(post.uid).avatar">
              <v-avatar color="grey" size="50">
                <img :src="user(post.uid).avatar" alt />
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar size="50">
                <img src="/avatar.png" alt />
              </v-avatar>
            </template>
          </v-col>
          <v-col cols="11">
            <v-card-subtitle v-if="user(post.uid)" class="py-2">
              {{ user(post.uid).name }}
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
                  <v-icon v-if="!isLiked(post)" @click="like(post)">
                    mdi-heart
                  </v-icon>
                  <v-icon v-else color="red lighten-2" @click="unlike(post)">
                    mdi-heart
                  </v-icon>
                  {{ isLiked(post) }}
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

<script lang="ts">
import Vue from 'vue'
import { moment } from '@/plugins/moment-filter'
// import { firebase, postRef } from '../plugins/firebase'

export default Vue.extend({
  data() {
    return {
      loginUser: this.$store.state.user.user,
    }
  },
  computed: {
    posts(): [] {
      return this.$store.getters['post/getPosts']
    },
    user() {
      return function (this: any, uid: string): any {
        return this.$store.getters['user/getUser'](uid)
      }
    },
    isLiked() {
      return function (this: any, post) {
        return this.$store.getters['post/getlikes'].some(function (value) {
          return post.uid === value.uid && post.id === value.postId
        })
      }
    },
    formated() {
      return function (createdAt: any): any {
        return createdAt !== null
          ? moment(createdAt.seconds * 1000).format('YYYY-MM-DD')
          : false
      }
    },
  },
  methods: {
    remove(postId: string): void {
      this.$store.dispatch('post/remove', postId)
    },
    like(post: object): void {
      this.$store.dispatch('post/like', post)
    },
    unlike(post: object): void {
      this.$store.dispatch('post/unlike', post)
    },
  },
})
</script>

<style lang="scss" scoped></style>
