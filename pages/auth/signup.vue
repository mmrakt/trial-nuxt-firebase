<template>
  <v-app>
    <v-main>
      <v-container class="py-5">
        <v-row justify="center">
          <v-sheet class="text-h4 py-5">Sign up</v-sheet>
        </v-row>
        <v-card width="600px" class="mx-auto my-10">
          <ValidationObserver ref="obs">
            <v-form ref="form">
              <v-container class="px-10">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  rules="required|alpha_num"
                  name="username"
                >
                  <v-text-field
                    v-model="userName"
                    prepend-icon="mdi-account-circle"
                    name="username"
                    type="text"
                    label="username"
                    :error-messages="errors"
                    :success="valid"
                    alpha_num
                    required
                  />
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors, valid }"
                  rules="required|email"
                  name="email"
                >
                  <v-text-field
                    id="email"
                    v-model="email"
                    prepend-icon="mdi-email"
                    name="email"
                    type="text"
                    label="email"
                    :error-messages="errors"
                    :success="valid"
                    required
                    email
                  />
                </ValidationProvider>
                <validation-provider
                  v-slot="{ errors, valid }"
                  rules="required|min:8|alpha_num"
                  name="password"
                >
                  <v-text-field
                    id="password"
                    ref="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    name="password"
                    label="password"
                    :type="showPassword ? 'text' : 'password'"
                    :error-messages="errors"
                    :success="valid"
                    required
                    min
                    alpha_num
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </validation-provider>
                <!--<validation-provider
              v-slot="{ errors, valid }"
              rules="required|min:8|alpha_num|confirmed:password"
              name="パスワード"
            >
              <v-text-field
                id="confirmPassword"
                v-model="confirmPassword"
                label="パスワード確認"
                type="password"
                :error-messages="errors"
                :success="valid"
                data-vv-as="password"
                required
                min
                alpha_num
                confirmed
              ></v-text-field>
                </validation-provider>-->

                <!-- <date-picker v-model="birthday" /> -->
                <v-btn
                  color="primary"
                  style="text-transform: none;"
                  @click="signUp"
                >
                  Sign up
                </v-btn>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
// import DatePicker from '../../components/DatePicker'
import { firebase, userRef } from '../../plugins/firebase'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    // DatePicker,
  },
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async signUp() {
      try {
        // authentication上にアカウントを登録
        const firebaseUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
        await firebaseUser.user.updateProfile({
          displayName: this.userName,
        })
        await this.writeUserData(firebaseUser.user.uid)
        await this.login(firebaseUser.user.uid)
        this.$router.push('/protected')
      } catch (error) {
        console.log(error.message)
      }
    },
    writeUserData(uid) {
      userRef.doc(uid).set({
        userName: this.userName,
        email: this.email,
      })
    },
  },
}
</script>
