<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  color: {
    type: String,
    default: 'secondary'
  }
});

const computedClass = computed(() => {
  return `panel-${props.color}`;
});

</script>

<template>
  <div :class="`panel fw-light ${computedClass}`">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.panel {
  padding: 1rem;
  border-radius: 1rem;
}

.panel-primary {
  background-color: $primary-color;
}

.panel-secondary {
  background-color: $secondary-color;
}
</style>