<script setup lang="ts">

</script>

<template>
  <div class="app-bar-wrapper d-flex align-items-center px-5 mt-2">
    <p><img src="@/assets/images/json-5.svg" alt="jserver logo" class="logo"/></p>
    <p class="brand">JServer v0.0.1</p>
  </div>
</template>

<style scoped lang="scss">
.app-bar-wrapper {
  border-bottom: 1px solid $default-border-color;
  .logo {
    width: 50px;
    height: 50px;
  }
  .brand {
    font-weight: 700;
    font-size: 1.5rem;
    margin-left: 1rem;
  }
}
</style>