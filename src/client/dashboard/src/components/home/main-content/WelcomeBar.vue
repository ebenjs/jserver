<script setup lang="ts">

import Panel from "@/components/global/Panel.vue";
</script>

<template>
  <Panel class="panel fw-light">
    <p class="m-0">👋 Welcome to the Gserver dashboard!</p>
    <hr>
    <small>
      This is a simple dashboard that allows you to manage your Gserver
      instance. You can view available endpoints and execute them.
    </small>
  </Panel>
</template>

<style scoped lang="scss">
.panel {
  p {
    font-size: 1.5rem;
  }
}
</style>