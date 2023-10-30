<script setup lang="ts">
import WelcomeBar from "@/components/home/main-content/WelcomeBar.vue";
import ContentPlaceholder from "@/components/home/main-content/ContentPlaceholder.vue";
import {computed, PropType} from "vue";
import RequestContent from "@/components/home/main-content/RequestContent.vue";

const props = defineProps({
  data: {
    type: Object as PropType<{}>,
    required: true
  }
});
const isDataEmpty = computed(() => {
  return Object.keys(props.data).length === 0;
});
</script>

<template>
  <div class="main-content-wrapper h-100 p-5">
    <WelcomeBar/>
    <div class="h-75 pt-5">
      <ContentPlaceholder v-if="isDataEmpty"/>
      <RequestContent v-else :data="data"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-content-wrapper {
  background-color: $primary-color;
}
</style>