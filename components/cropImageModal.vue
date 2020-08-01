<template>
  <v-layout>
    <label>
      <v-icon>mdi-camera-plus</v-icon>
      <v-file-input
        accept="image/*"
        style="display: none;"
        @change="setImage"
      />
    </label>
    <v-dialog
      v-model="dialog"
      :max-width="dialogMaxWidth"
      :max-height="dialogMaxHeight"
      hide-overlay
      :disabled="!imgSrc"
    >
      <v-card>
        <v-card-text>
          <vue-cropper
            ref="cropper"
            :guides="true"
            :view-mode="2"
            drag-mode="crop"
            :auto-crop-area="0.5"
            :min-container-width="250"
            :min-container-height="180"
            :background="true"
            :rotatable="false"
            :src="imgSrc"
            alt="Source Image"
            :img-style="{ width: '400px', height: '300px' }"
            :aspect-ratio="1"
            :zoomable="false"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            style="text-transform: none; color: white;"
            @click="cropImage"
          >
            Apply
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            style="text-transform: none;"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { v4 } from 'uuid'

export default {
  components: {
    VueCropper,
  },
  props: {
    value: {},
    pk: {
      type: String,
      default: 'image_key',
    },
    dialogMaxWidth: {
      type: String,
      default: '600px',
    },
    dialogMaxHeight: {
      type: String,
      default: '0.8vh',
    },
    maxWidth: {
      type: Number,
      default: 1920,
    },
    maxHeight: {
      type: Number,
      default: 1200,
    },
    // the URL of the blob image
    objectUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imgSrc: '',
      cropImg: null,
      dialog: false,
      file: null,
      filename: '',
      croppedBlob: null,
    }
  },
  methods: {
    setImage(file) {
      const path = require('path')
      this.filename = v4() + path.extname(file.name)

      if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = (event) => {
          this.imgSrc = event.target!.result
          this.$refs.cropper.replace(event.target!.result)
          this.$emit('update:dataUrl', this.imgSrc)
        }

        reader.readAsDataURL(file)
        this.dialog = true
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cropImage() {
      this.$refs.cropper.getCroppedCanvas().toBlob(
        (blob) => {
          const croppedBlob = {
            file: blob,
            name: this.filename,
          }
          this.$emit('dispatchImage', croppedBlob)
        },
        'image/jpeg',
        0.95
      )
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
