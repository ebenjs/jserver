<script setup lang="ts">

const props = defineProps({
  label: {
    type: String,
    required: true
  }
});

</script>

<template>
  <div :class="`verb-preview d-flex align-items-center justify-content-center ${label.toLowerCase()}-color`">
    {{ label.length <= 4 ? label : label.substring(0, 3) }}
  </div>
</template>

<style scoped lang="scss">
.verb-preview {
  font-weight: bold;
  color: $primary-text-color;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.get-color {
  background-color: $get-color;
}

.post-color {
  background-color: $post-color;
}

.put-color {
  background-color: $put-color;
}

.delete-color {
  background-color: $delete-color;
}
</style>