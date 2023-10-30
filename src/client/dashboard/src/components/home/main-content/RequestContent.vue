<script setup lang="ts">
import type {PropType} from "vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {VAceEditor} from 'vue3-ace-editor';
import workerJsonUrl from "ace-builds/src-noconflict/worker-json.js";
import '@/../ace.config'

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
const requestBody = ref()

const themes = ['github', 'chrome', 'monokai'];

const url = computed(() => {
  return `${props.data?.metadata.url}/${props.data.metadata.name}${props.data?.verb.suffix}`;
});
// compute proper class name for the verb button
const verbButtonClass = computed(() => {
  return `${props.data?.verb.label.toLowerCase()}-button`;
});

const states = ref({
  lang: 'json',
  theme: 'monokai',
  content: '{}',
});

</script>

<template>
  <div class="row">
    <div class="col d-flex">
      <div class="input-group mb-3">
        <span :class="`input-group-text ${verbButtonClass}`">{{ data.verb.label }}</span>
        <input type="text" v-model="url" class="form-control request-url-input"
               aria-label="url">
      </div>
      <button class="btn btn-sm submit-button w-25">Send request</button>
    </div>
  </div>
  <div class="row">
    <div class="col d-flex flex-column">
      <div class="row">
        <div class="col title">
          Request Body
        </div>
        <small>
          Add a request body to your request.
        </small>
      </div>
      <div class="row mt-2">
        <div class="col">
          <VAceEditor
              ref="aceRef"
              v-model:value="states.content"
              class="vue-ace-editor"
              :lang="states.lang"
              :theme="states.theme"
              :options="{
                useWorker: true,
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true,
              }"
          />
        </div>
      </div>
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

.get-button {
  background-color: $get-color;
  border-color: $get-color;
  color: $primary-text-color;
}

.post-button {
  background-color: $post-color;
  border-color: $post-color;
  color: $primary-text-color;
}

.put-button {
  background-color: $put-color;
  border-color: $put-color;
  color: $primary-text-color;
}

.delete-button {
  background-color: $delete-color;
  border-color: $delete-color;
  color: $primary-text-color;
}

select {
  margin-right: 15px;
}

.vue-ace-editor {
  font-size: 16px;
  border: 1px solid $secondary-color;
  flex: 1;
  min-height: 22rem;
  border-radius: 0.5rem;
}
.title {
  font-size: 1.2rem;
  font-weight: normal;
}
</style>