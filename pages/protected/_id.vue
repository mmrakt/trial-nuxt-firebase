<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card width="500px" class="mx-auto mt-5">
          <v-row class="px-auto">
            <v-col cols="6">
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-text>{{ user.bio }}</v-card-text>
            </v-col>
            <v-col cols="6" justify="end">
              <v-row>
                <template v-if="user.avatar">
                  <v-avatar color="grey" size="100">
                    <img :src="user.avatar" alt />
                  </v-avatar>
                </template>
                <template v-else>
                  <v-avatar size="100">
                    <img src="/avatar.png" alt />
                  </v-avatar>
                </template>
                <!-- アバター写真アップロード用 -->
                <template v-if="isMypage">
                  <crop-image-modal @dispatchImage="uploadAvatar" />
                </template>
              </v-row>
              <v-row>
                <template v-if="isMypage">
                  <v-dialog v-model="dialog" persistant max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn style="text-transform: none;" v-on="on">
                        Edit profile
                      </v-btn>
                      <v-btn @click="outputLog">Output log</v-btn>
                    </template>
                    <edit-user-modal
                      v-if="dialog"
                      v-model="user"
                      @closeModal="dialog = false"
                      @save="updateProfile"
                    />
                  </v-dialog>
                </template>
              </v-row>
            </v-col>
          </v-row>
          <v-card-text>
            <strong>{{ followingCount }}</strong>
            follow
            <span class="ml-2"></span>
            <strong>{{ followerCount }}</strong>
            follower
            <template v-if="!isMypage">
              <v-btn
                v-if="isFollowing(user.uid)"
                rounded
                color="primary"
                class="float-right"
                style="text-transform: none;"
                @click="unfollow(user.uid)"
              >
                following
              </v-btn>
              <v-btn
                v-else
                rounded
                class="float-right"
                style="text-transform: none;"
                @click="follow(user.uid)"
              >
                follow
              </v-btn>
            </template>
          </v-card-text>
          <hr />
          <v-tabs fixed-tabs>
            <v-tab style="text-transform: none;" @click="isActive = 1">
              Timeline
            </v-tab>
            <v-tab style="text-transform: none;" @click="isActive = 2">
              Follower
            </v-tab>
            <v-tab style="text-transform: none;" @click="isActive = 3">
              Following
            </v-tab>
          </v-tabs>
          <post-list v-if="isActive === 1" />
          <relation-list
            v-if="(isActive === 2) | (isActive === 3)"
            :status="isActive"
          />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import editUserModal from '@/components/editUserModal.vue'
import postList from '@/components/postList.vue'
import relationList from '@/components/relationList.vue'
import cropImageModal from '@/components/cropImageModal.vue'
import { firebase } from '@/plugins/firebase'

interface Data {
  paramsId: string
  dialog: boolean
  avatarDialog: boolean
  user: object
  isActive: number
}

export default Vue.extend({
  layout: 'protected',
  components: {
    editUserModal,
    postList,
    relationList,
    cropImageModal,
  },
  data(): Data {
    return {
      paramsId: this.$route.params.id,
      dialog: false,
      avatarDialog: false,
      user: {},
      isActive: 1,
    }
  },
  computed: {
    isMypage(): boolean {
      return this.paramsId === this.$store.getters['user/getUid']
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
    followingCount(this: any) {
      return this.$store.getters['user/getFollowingCount'](this.paramsId)
    },
    followerCount(this: any) {
      return this.$store.getters['user/getFollowerCount'](this.paramsId)
    },
  },
  created(): void {
    this.$store.dispatch('post/postsBind')
    this.user = this.$store.getters['user/getUser'](this.paramsId)
  },
  methods: {
    updateProfile(): void {
      this.$store.dispatch('user/updateProfile', this.user)
      this.dialog = false
    },
    uploadAvatar(file: any): void {
      this.$store.dispatch('user/uploadAvatar', file)
    },
    outputLog(): void {
      firebase
        .functions()
        .httpsCallable('sampleOnCall')({ name: 'akito' })
        .then((res) => {
          console.log(res)
        })
    },
    follow(uid: string): void {
      this.$store.dispatch('user/setFollow', uid)
      this.$store.dispatch('user/relationBind')
    },
    unfollow(uid: string): void {
      this.$store.dispatch('user/setUnfollow', uid)
      this.$store.dispatch('user/relationBind')
    },
  },
})
</script>

<style lang="scss" scoped></style>
