<script setup lang="ts">

import type {PropType} from "vue";

interface ResponseDataTypes {
  isServerData: boolean,
  data: object,
}

const props = defineProps({
  response: {
    type: Object as PropType<ResponseDataTypes>,
    required: true
  }
});
</script>

<template>
  <div class="sub-content-wrapper h-100">
    <ul id="navigationTab" role="tablist" class="nav nav-underline d-flex align-items-center justify-content-center">
      <li class="nav-item">
        <a id="response-tab" data-bs-toggle="tab" data-bs-target="#response-tab-pane" class="nav-link active" href="#">Server
          response</a>
      </li>
      <li class="nav-item">
        <a id="history-tab" data-bs-toggle="tab" data-bs-target="#history-tab-pane" class="nav-link"
           href="#">History</a>
      </li>
    </ul>
    <div class="tab-content mx-3 mt-3" id="navigationTabContent">
      <div class="tab-pane show active" id="response-tab-pane" role="tabpanel" aria-labelledby="response-tab"
           tabindex="0">
        <div class="tab-pane-wrapper" v-if="!response.isServerData">
          <img src="@/assets/images/the-server-3.svg" alt="server_image" class="no-response-image"/>
          <p class="title">No response yet</p>
        </div>
<!--        v-else-->


      </div>
      <div class="tab-pane" id="history-tab-pane" role="tabpanel" aria-labelledby="history-tab" tabindex="0">
        <div class="tab-pane-wrapper">
          History
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-content-wrapper {
  background-color: $tertiary-color;
}

.nav {
  .nav-link {
    color: $primary-text-color;
  }
}

.tab-content {
  //border: 1px solid $default-border-color;
  height: calc(100% - 5rem);

  .tab-pane {
    height: 100%;

    .tab-pane-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      .no-response-image {
        width: 5rem;
        height: 5rem;
        opacity: 0.6;
      }
    }
  }
}
</style>