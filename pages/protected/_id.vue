<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card width="500px" class="mx-auto mt-5">
          <v-row class="px-auto">
            <v-col cols="6">
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-text>
                {{ user.bio }}
              </v-card-text>
            </v-col>
            <v-col cols="6" justify="end">
              <v-row>
                <v-icon size="100">mdi-account-circle</v-icon>
              </v-row>
              <v-row>
                <v-dialog v-model="dialog" persistant max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn style="text-transform: none;" v-on="on">
                      Edit profile
                    </v-btn>
                  </template>
                  <user-edit-modal
                    v-if="dialog"
                    v-model="user"
                    @closeModal="dialog = false"
                    @save="updateProfile"
                  />
                </v-dialog>
              </v-row>
            </v-col>
          </v-row>
          <v-card-text>
            <strong>100</strong>
            follow
            <span class="ml-2"></span>
            <strong>100</strong>
            follower
          </v-card-text>
          <hr />
          <ul v-for="(post, index) in posts" :key="index" class="pl-0">
            <v-row no-gutters class="px-1 pt-5">
              <v-col cols="1">
                <v-icon size="50">mdi-account-circle</v-icon>
              </v-col>
              <v-col cols="11">
                <v-card-subtitle class="py-2">
                  {{ user.userName }}
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
                      <v-icon
                        v-else
                        color="red lighten-2"
                        @click="unlike(post.id)"
                      >
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { moment } from '@/plugins/moment-filter'
import userEditModal from '@/components/userEditModal.vue'

export default {
  layout: 'protected',
  components: {
    userEditModal,
  },
  data() {
    return {
      dialog: false,
      user: null,
    }
  },
  computed: {
    posts() {
      return this.$store.getters['post/getUserPost'](this.user.uid)
    },
    formated() {
      return function (createdAt) {
        return moment(createdAt.seconds * 1000).format('YYYY-MM-DD')
      }
    },
  },
  created() {
    this.$store.dispatch('post/postInit')
    this.user = this.$store.getters['user/getLoginUser']
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
    updateProfile() {
      this.$store.dispatch('user/update', this.user)
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
