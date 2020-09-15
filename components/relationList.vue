<template>
  <div>
    <v-card>
      <v-card-title v-if="status === 2" class="blue lighten-2">
        Follower
      </v-card-title>
      <v-card-title v-else class="blue lighten-2">Following</v-card-title>
      <ul v-for="(relation, index) in relationList" :key="index" class="pl-0">
        <v-row no-gutters>
          <v-col cols="2">
            <nuxt-link
              v-if="user(relationId(relation))"
              :to="{
                name: 'protected-id',
                params: { id: relationId(relation) },
              }"
              style="text-decoration: none; color: black;"
            >
              <v-avatar color="grey" size="50">
                <img
                  v-if="user(relationId(relation)).avatar"
                  :src="user(relationId(relation)).avatar"
                  alt
                />
                <img v-else src="/avatar.png" alt />
              </v-avatar>
            </nuxt-link>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col v-if="user(relationId(relation))" cols="8">
                <nuxt-link
                  :to="{
                    name: 'protected-id',
                    params: { id: relationId(relation) },
                  }"
                >
                  {{ user(relationId(relation)).name }}
                </nuxt-link>
              </v-col>
              <v-col v-if="relationId(relation) !== loginUserId" cols="2">
                <v-btn
                  v-if="isFollowing(relationId(relation))"
                  rounded
                  color="primary"
                  class="float-right"
                  style="text-transform: none;"
                  @click="postUnfollow(relationId(relation))"
                >
                  following
                </v-btn>
                <v-btn
                  v-else
                  rounded
                  class="float-right"
                  style="text-transform: none;"
                  @click="postFollow(relationId(relation))"
                >
                  follow
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="user(relationId(relation))">
              <v-card-text>{{ user(relationId(relation)).bio }}</v-card-text>
            </v-row>
          </v-col>
        </v-row>
        <hr />
      </ul>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import followButton from '@/components/followButton.vue'
export default Vue.extend({
  props: {
    status: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      paramsId: this.$route.params.id,
    }
  },
  computed: {
    relationList(this: any) {
      if (this.status === 2) {
        return this.$store.getters['user/getFollower'](this.paramsId)
      } else {
        return this.$store.getters['user/getFollowing'](this.paramsId)
      }
    },
    relationId() {
      return function (this: any, relation) {
        if (this.status === 2) {
          return relation.followingId
        } else {
          return relation.followerId
        }
      }
    },
    user() {
      return function (this: any, uid) {
        return this.$store.getters['user/getUser'](uid)
      }
    },
    loginUserId() {
      return this.$store.getters['user/getUid']
    },
    isFollowing() {
      return function (this: any, uid) {
        return this.$store.getters['user/getSelfFollowing'].some(function (
          value
        ) {
          return uid === value.followerId
        })
      }
    },
  },
  methods: {
    postFollow(uid: string): void {
      this.$store.dispatch('user/setFollow', uid)
      this.$store.dispatch('user/relationBind')
    },
    postUnfollow(uid: string): void {
      this.$store.dispatch('user/setUnfollow', uid)
      this.$store.dispatch('user/relationBind')
    },
  },
})
</script>

<style lang="scss" scoped></style>
