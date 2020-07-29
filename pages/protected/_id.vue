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
                <label>
                  <v-icon>mdi-camera-plus</v-icon>
                  <v-file-input
                    style="display: none;"
                    accept="image/*"
                    @change="uploadAvatar"
                  ></v-file-input>
                </label>
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
          <post-list />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import userEditModal from '@/components/userEditModal.vue'
import postList from '@/components/postList.vue'

export default {
  layout: 'protected',
  components: {
    userEditModal,
    postList,
  },
  data() {
    return {
      dialog: false,
      user: null,
    }
  },
  created() {
    this.$store.dispatch('post/postInit')
    this.user = this.$store.getters['user/getLoginUser']
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('user/updateProfile', this.user)
      this.dialog = false
    },
    uploadAvatar(file) {
      this.$store.dispatch('user/uploadAvatar', file)
    },
  },
}
</script>

<style lang="scss" scoped></style>
