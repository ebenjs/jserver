<script setup lang="ts">
import WelcomeBar from "@/components/home/main-content/WelcomeBar.vue";
import ContentPlaceholder from "@/components/home/main-content/ContentPlaceholder.vue";
</script>

<template>
  <div class="main-content-wrapper h-100 p-5">
    <WelcomeBar/>
    <div class="h-75 pt-5">
      <ContentPlaceholder/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-content-wrapper {
  background-color: $primary-color;
}
</style>