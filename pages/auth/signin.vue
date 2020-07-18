<template>
  <v-app>
    <v-main>
      <v-container class="py-5">
        <v-row align="center">
          <v-row justify="space-around">
            <v-card width="400px">
              <v-card-title>サインイン</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <v-text-field
                    v-model="email"
                    name="email"
                    label="メールアドレス"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    name="password"
                    label="パスワード"
                    prepend-icon="mdi-lock"
                    append-icon="mdi-eye"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">サインイン</v-btn>
              </v-card-actions>
            </v-card>
            <template>
              <div class="text-center">
                <v-bottom-sheet>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" @click="fbGoogleLogin">
                      <v-icon>mdi-google</v-icon>
                      Sign in With Google
                    </v-btn>
                  </template>
                </v-bottom-sheet>
              </div>
            </template>
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { firebase, googleProvider } from '../../plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  middleware: ['handle-login-route'],
  methods: {
    ...mapActions('user', ['login']),
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((firebaseUser) => {
          return this.login(firebaseUser.user.uid)
        })
        .then(() => {
          this.$router.push('/protected')
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    // Googleアカウントによるログイン
    async fbGoogleLogin() {
      const { user } = await firebase.auth().signInWithPopup(googleProvider)
      await this.login(user.user)
      this.$router.push('/protected')
    },
    async fbGoogleLogout() {
      await this.logout()
      this.$router.push('/')
    },
  },
}
</script>
