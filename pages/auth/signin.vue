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
                  <p v-if="state.errMsg" style="color: red;">
                    {{ state.errMsg }}
                  </p>
                  <v-text-field
                    v-model="state.email"
                    name="email"
                    label="email"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="state.password"
                    name="password"
                    label="password"
                    :type="state.showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="
                      state.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="state.showPassword = !state.showPassword"
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

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { firebase, googleProvider } from '@/plugins/firebase'

export default defineComponent({
  setup(_props, context: any) {
    const state = reactive({
      email: '',
      password: '',
      showPassword: false,
      errMsg: '',
    })
    // const middleware = {
    //   middleware: ['handle-login-route'],
    // }
    context.root.$store.dispatch('user/usersBind')

    function fbEmailLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(context.email, context.password)
        .then(() => {
          context.login()
          context.root.$router.push('/protected')
        })
        .catch((error) => {
          context.errMsg = error.message
        })
    }
    const login = function () {
      context.root.$store.dispatch('user/login')
    }
    function logout(context: any) {
      context.root.$store.dispatch('user/logout')
    }
    async function fbGoogleLogin() {
      await firebase.auth().signInWithPopup(googleProvider)
      await login()
      context.root.$router.push('/protected')
    }
    async function fbGoogleLogout(context: any): Promise<void> {
      await context.logout()
      context.root.$router.push('/')
    }
    return {
      state,
      login,
      logout,
      fbGoogleLogin,
      fbGoogleLogout,
      fbEmailLogin,
    }
  },
})
</script>
