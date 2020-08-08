<template>
  <v-card>
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="User Name*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="bio" label="bio" type="text"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('closeModal')">
        Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="$emit('save')">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name: {
      get(): string {
        return this.value.name
      },
      set(name: string) {
        this.updateValue({ name })
      },
    },
    bio: {
      get(): string {
        return this.value.bio
      },
      set(bio: string) {
        this.updateValue({ bio })
      },
    },
  },
  methods: {
    updateValue(diff: {}) {
      this.$emit('input', { ...(this as any).value, ...diff })
    },
  },
})
</script>

<style lang="scss" scoped></style>
