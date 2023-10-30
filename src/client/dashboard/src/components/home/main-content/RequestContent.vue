<script setup lang="ts">
import type {PropType} from "vue";
import {computed, ref} from "vue";

interface RequestDataTypes {
  verb: object,
  metadata: object,
}

const props = defineProps({
  data: {
    type: Object as PropType<RequestDataTypes>,
    required: true
  }
});
const copyData = ref(props.data);
const url = computed(() => {
  return props.data?.metadata.url + props.data?.verb.suffix;
});
// compute proper class name for the verb button
const verbButtonClass = computed(() => {
  return `${props.data?.verb.label.toLowerCase()}-button`;
});
</script>

<template>
  <div class="row">
    <div class="col d-flex">
      <div class="input-group mb-3">
        <span :class="`input-group-text ${verbButtonClass}`">{{ data.verb.label }}</span>
        <input type="text" v-model="url" class="form-control request-url-input"
               aria-label="Amount (to the nearest dollar)">
      </div>
      <button class="btn btn-sm submit-button w-25">Send request</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.verb-button {
  //background-color: $tertiary-accent-color;
  color: $primary-color;
  font-weight: bold;
}

.submit-button {
  background-color: $primary-color;
  color: $primary-accent-color;
  border-color: $primary-accent-color;
  height: 2.4rem;
  margin-left: 10px;

  &:hover {
    background-color: $primary-accent-color;
    color: $primary-text-color;
    border-color: $primary-accent-color;
  }
}

.request-url-input {
  background-color: rgba(255, 255, 255, 0.73);
}

.get-button{
  background-color: $get-color;
  border-color: $get-color;
  color: $primary-text-color;
}

.post-button{
  background-color: $post-color;
  border-color: $post-color;
  color: $primary-text-color;
}

.put-button{
  background-color: $put-color;
  border-color: $put-color;
  color: $primary-text-color;
}

.delete-button{
  background-color: $delete-color;
  border-color: $delete-color;
  color: $primary-text-color;
}

</style>