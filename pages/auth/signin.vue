<template>
  <v-app>
    <v-main>
      <v-container class="py-5">
        <v-row justify="center">
          <v-sheet class="text-h4 py-5">Sign in</v-sheet>
        </v-row>
        <v-row justify="center">
          <v-col cols="4">
            <v-card>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <p v-if="errMsg" style="color: red;">{{ errMsg }}</p>
                  <v-text-field
                    v-model="email"
                    name="email"
                    label="email"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    name="password"
                    label="password"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  style="text-transform: none;"
                  @click="fbEmailLogin"
                >
                  Sign in
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-row justify="center" class="mt-5">
              New to this App?
              <nuxt-link
                to="/auth/signup"
                style="text-decoration: none;"
                class="ml-1"
              >
                create an account
              </nuxt-link>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-list>
              <v-list-item>
                <v-btn
                  class="red lighten-2"
                  style="color: white; text-transform: none;"
                  width="100%"
                  @click="fbGoogleLogin"
                >
                  <v-icon class="mr-3">mdi-google</v-icon>
                  Sign In with Google
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn
                  class="blue lighten-2"
                  style="color: white; text-transform: none;"
                  width="100%"
                >
                  <v-icon class="mr-3">mdi-twitter</v-icon>
                  Sign In with Twitter
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn
                  class="grey darken-2"
                  style="color: white; text-transform: none;"
                  width="100%"
                >
                  <v-icon class="mr-3">mdi-github</v-icon>
                  Sign In with GitHub
                </v-btn>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { firebase, googleProvider } from '@/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errMsg: null,
    }
  },
  middleware: ['handle-login-route'],
  methods: {
    ...mapActions('user', ['login']),
    fbEmailLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((firebaseUser) => {
          this.login(firebaseUser.user.uid)
          this.$router.push('/protected')
        })
        .catch((error) => {
          console.log(error.message)
          this.errMsg = error.message
        })
    },
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
