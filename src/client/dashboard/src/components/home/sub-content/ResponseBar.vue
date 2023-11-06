<script setup lang="ts">
import Panel from "@/components/global/Panel.vue";
import {statusFormatter} from "@/utilities/statusFormatter";
import {computed} from "vue";

const props = defineProps({
  status: {
    type: String,
    required: true
  }
});
const renderStatus = computed(() => {
  return `Status : ${statusFormatter(Number(props.status))}`;
});
</script>

<template>
  <Panel color="primary">
    <div class="row">
      <div class="col" v-html="renderStatus">
      </div>
      <div class="col d-flex align-items-end justify-content-end">
        <!--        <button class="response-bar-button" title="Format" @click="$emit('format-response')">-->
        <!--          <span class="material-icons">format_align_left</span>-->
        <!--        </button>-->
        <button class="response-bar-button" title="Copy" @click="$emit('copy-response-data')">
          <span class="material-icons">content_copy</span>
        </button>
      </div>
    </div>
  </Panel>
</template>

<style scoped lang="scss">
.response-bar-button {
  background-color: transparent;
  border: none;
  outline: none;
  color: $primary-text-color;

  .material-icons {
    font-size: 1rem;
  }
}

.http-success {
  color: $get-color;
}

.http-error {
  color: $delete-color;
}
</style>