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
                <crop-image-modal @dispatchImage="uploadAvatar" />
              </v-row>
              <v-row>
                <v-dialog v-model="dialog" persistant max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn style="text-transform: none;" v-on="on">
                      Edit profile
                    </v-btn>
                  </template>
                  <edit-user-modal
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
          <post-list />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import editUserModal from '@/components/editUserModal.vue'
import postList from '@/components/postList.vue'
import cropImageModal from '@/components/cropImageModal.vue'

interface Data {
  dialog: boolean
  avatarDialog: boolean
  user: object
}
export default Vue.extend({
  layout: 'protected',
  components: {
    editUserModal,
    postList,
    cropImageModal,
  },
  data(): Data {
    return {
      dialog: false,
      avatarDialog: false,
      user: {},
    }
  },
  created(): void {
    this.$store.dispatch('post/postsBind')
    this.user = this.$store.getters['user/getUser'](this.$route.params.id)
  },
  methods: {
    updateProfile(): void {
      this.$store.dispatch('user/updateProfile', this.user)
      this.dialog = false
    },
    uploadAvatar(file: any): void {
      this.$store.dispatch('user/uploadAvatar', file)
    },
  },
})
</script>

<style lang="scss" scoped></style>
