<template>
  <v-menu
    ref="menu"
    v-model="menu"
    transition="scale-transition"
    offset-y
    min-width="290px"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="picker" label="生年月日" readonly v-on="on" />
    </template>
    <v-date-picker
      ref="picker"
      v-model="picker"
      :picker-date="pickerDate"
      min="1920-01-01"
      max="2020-01-01"
      locale="ja"
      @click="menu = false"
    />
  </v-menu>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
    },
  },
  data() {
    return {
      menu: false,
      pickerDate: '1990-01-01',
    }
  },
  computed: {
    picker: {
      get() {
        return this.value
      },
      set(val) {
        this.menu = false
        this.$emit('input', val)
      },
    },
  },
  watch: {
    menu(val) {
      val &&
        setTimeout(() => {
          this.$refs.picker.activePicker = 'YEAR'
          this.pickerDate = null
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
