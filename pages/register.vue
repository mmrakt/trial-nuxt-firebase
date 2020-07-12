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
            >
              <v-text-field
                v-model="userId"
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
            >
              <v-text-field
                id="email"
                v-model="email"
                name="email"
                type="text"
                label="メールアドレス"
                :error-messages="errors"
                :success="valid"
                required
                email
              />
            </ValidationProvider>
            <date-picker v-model="birthday" />
            <v-btn color="primary" @click="submit">登録</v-btn>
          </v-container>
        </v-form>
      </ValidationObserver>
    </v-card>
  </v-content>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import DatePicker from '../components/DatePicker'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    DatePicker,
  },
  data() {
    return {
      userId: '',
      email: '',
      birthday: '',
    }
  },
  computed: {
    userData() {
      return this.$store.state.auth.data
    },
  },
  mounted() {
    this.$store.dispatch('auth/init')
    // this.$store.dispatch('auth/set')
  },
  methods: {
    submit() {
      const userData = {
        userId: this.userId,
        email: this.email,
        birthday: this.birthday,
      }
      console.log(userData)
      this.$store.dispatch('auth/register', userData)

      this.$router.push('/timeline')
    },
  },
}
</script>

<style lang="scss" scoped></style>
