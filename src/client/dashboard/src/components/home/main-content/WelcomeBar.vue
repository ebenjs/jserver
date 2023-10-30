<script setup lang="ts">

</script>

<template>
  <div class="welcome-bar-wrapper fw-light">
    <p class="m-0">👋 Welcome to the jserver dashboard!</p>
    <hr>
    <small>
      This is a simple dashboard that allows you to manage your jserver
      instance. You can view available endpoints and execute them.
    </small>
  </div>
</template>

<style scoped lang="scss">
.welcome-bar-wrapper {
  background-color: $secondary-color;
  padding: 1rem;
  border-radius: 1rem;

  p {
    font-size: 1.5rem;
  }
}
</style>