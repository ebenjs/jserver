<script setup lang="ts">
import VerbPreview from "@/components/home/left-navigation/VerbPreview.vue";
import {PropType} from "vue";

type Verb = {
  label: string;
  description: string;
  suffix: string;
}

interface Resource {
  name: string;
  url: string;
}

const props = defineProps({
  verb: {
    type: Object as PropType<Verb>,
    required: true
  },
  resource: {
    type: Object as PropType<Resource>,
    required: true
  }
});

</script>

<template>
  <div class="verb-panel d-flex py-3 px-5">
    <div class="flex-shrink-0">
      <VerbPreview :label="verb.label"/>
    </div>
    <div class="flex-grow-1 ms-3">
      <div class="fw-bold">{{ `${resource.url}${verb.suffix}` }}</div>
      <div class="">{{ verb.description }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.verb-panel:hover {
  background-color: $primary-color;
  cursor: pointer;
}
</style>