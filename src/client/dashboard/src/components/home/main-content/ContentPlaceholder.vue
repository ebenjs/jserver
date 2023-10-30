<script setup lang="ts">

</script>

<template>
  <div class="content-placeholder-wrapper h-100 d-flex flex-column align-items-center justify-content-center fw-light">
    <p>
      <img src="@/assets/images/template-4.svg" alt="Placeholder" width="100" height="100">
    </p>
    <small>
      No endpoint is selected yet. Please select an endpoint
      from the left navigation panel to load the request maker
      view.
    </small>
  </div>
</template>

<style scoped lang="scss">
.content-placeholder-wrapper {
  background-color: $secondary-color;
  padding: 1rem;
  border-radius: 1rem;

  small {
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>