<template>
  <div>
    <div class="container">
      <div>
        <h1 class="title">FirebaseUI ログイン</h1>
        <firebase-auth />
      </div>
    </div>
  </div>
</template>

<script>
import firebaseAuth from '~/components/firebaseAuth.vue'

export default {
  components: {
    firebaseAuth,
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
