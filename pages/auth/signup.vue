<template>
  <v-content>
    <v-card width="600px" class="mx-auto my-10">
      <v-card-title class="text-md-center">新規会員登録フォーム</v-card-title>
      <v-divider></v-divider>
      <ValidationObserver ref="obs">
        <v-form ref="form">
          <v-container class="px-10">
            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required|alpha_num"
              name="ユーザーID"
            >
              <v-text-field
                v-model="userId"
                prepend-icon="mdi-account-circle"
                name="userId"
                type="text"
                label="ユーザーID(半角英数字)"
                :error-messages="errors"
                :success="valid"
                alpha_num
                required
              />
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required|email"
              name="メールアドレス"
            >
              <v-text-field
                id="email"
                v-model="email"
                prepend-icon="mdi-email"
                name="email"
                type="text"
                label="メールアドレス"
                :error-messages="errors"
                :success="valid"
                required
                email
              />
            </ValidationProvider>
            <validation-provider
              v-slot="{ errors, valid }"
              rules="required|min:8|alpha_num"
              name="パスワード"
            >
              <v-text-field
                id="password"
                ref="password"
                v-model="password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                name="password"
                label="パスワード"
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
            <v-btn color="primary" @click="signUp">登録</v-btn>
          </v-container>
        </v-form>
      </ValidationObserver>
    </v-card>
  </v-content>
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
      userId: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
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
        // firestoreにアカウント情報を格納
        await this.writeUserData(firebaseUser.user.uid, firebaseUser.user.email)
        await this.login(firebaseUser.user.uid)
        this.$router.push('/protected')
      } catch (error) {
        console.log(error.message)
      }
    },
    writeUserData(userId, email) {
      userRef.doc(userId).set({
        email,
      })
    },
  },
}
</script>
