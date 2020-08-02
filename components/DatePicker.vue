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
<script lang="ts">
import Vue from 'vue'

interface Data {
  menu: boolean
  pickerDate: string
}
export default Vue.extend({
  name: 'DatePicker',
  props: {
    value: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
    },
  },
  data(): Data {
    return {
      menu: false,
      pickerDate: '1990-01-01',
    }
  },
  computed: {
    picker: {
      get(): string {
        return this.value
      },
      set(val: string): void {
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
})
</script>

<style lang="scss" scoped></style>
