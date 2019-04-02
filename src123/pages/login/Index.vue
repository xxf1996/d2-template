<template>
  <div class="page-login" flex="dir:top main:center cross:center">
    <login></login>
  </div>
</template>

<script>
import login from './Login.vue'

export default {
  components: {
    login
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #F0F2F5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
}
</style>
