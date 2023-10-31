<script setup lang="ts">
import type {PropType} from "vue";
import {computed, onMounted, provide, reactive, ref, watch} from "vue";
import {VAceEditor} from 'vue3-ace-editor';
import ace from "ace-builds/src-noconflict/ace";
import beautify from "ace-builds/src-noconflict/ext-beautify";
import jsbeautify from 'js-beautify';
import '@/../ace.config'

interface VerbTypes {
  label: string,
  suffix: string,
}
interface MetadataTypes {
  url: string,
  name: string,
  schema: object,
}
interface RequestDataTypes {
  verb: VerbTypes,
  metadata: MetadataTypes,
}

const props = defineProps({
  data: {
    type: Object as PropType<RequestDataTypes>,
    required: true
  }
});

const emit = defineEmits(['server-response']);

const urlCopy = ref(`${props.data?.metadata.url}/${props.data.metadata.name}${props.data?.verb.suffix}`)

watch(() => props.data?.verb.suffix, () => {
  urlCopy.value = computeUrl();
})
const computeUrl = () => {
  console.log('url', `${props.data?.metadata.url}/${props.data.metadata.name}${props.data?.verb.suffix}`)
  return `${props.data?.metadata.url}/${props.data.metadata.name}${props.data?.verb.suffix}`;
}

const verbButtonClass = computed(() => {
  return `${props.data?.verb.label.toLowerCase()}-button`;
});

const schema = computed(() => {
  const schema = {};
  const data = props.data?.metadata?.schema;
  for (const key in data) {
    schema[key] = typeof data[key];
  }
  return schema;
});

const showSchema = computed(() => {
  return props.data?.verb.label === 'POST' || props.data?.verb.label === 'PUT';
});

const states = ref({
  lang: 'json',
  theme: 'monokai',
  content: `${jsbeautify(JSON.stringify(schema.value), {indent_size: 4, space_in_empty_paren: true})}`,
});
const response = ref({isServerData: true, data: {}});

const sendRequestWithBody = () => {
  console.log(states.value.content);
  fetch(urlCopy.value, {
    method: props.data?.verb.label,
    headers: {
      'Content-Type': 'application/json'
    },
    body: states.value.content
  })
      .then(response => response.json())
      .then(data => {
        response.value.data = data.data;
        emit('server-response', response.value.data);
      });
}

const sendRequestWithoutBody = () => {
  fetch(urlCopy.value, {
    method: props.data?.verb.label,
  })
      .then(response => response.json())
      .then(data => {
        response.value.data = data.data;
        emit('server-response', response.value.data);
      });
}

onMounted(() => {
  if (showSchema.value) {
    const editor = ace.edit("editor");
    editor.commands.addCommand({
      name: "beautify",
      bindKey: {
        win: "Ctrl-Shift-B",
        mac: "Command-Shift-B",
      },
      exec: function () {
        beautify.beautify(editor.session);
      },
    });
  }
});

</script>

<template>
  <div class="row">
    <div class="col d-flex">
      <div class="input-group mb-3">
        <span :class="`input-group-text ${verbButtonClass}`">{{ data.verb.label }}</span>
        <input type="text" v-model="urlCopy" class="form-control request-url-input"
               aria-label="url">
      </div>
      <button class="btn btn-sm submit-button w-25"
              @click="showSchema ? sendRequestWithBody() : sendRequestWithoutBody()">Send request
      </button>
    </div>
  </div>
  <div class="row" v-if="showSchema">
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
              id="editor"
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
  <div v-else>
    <div class="row">
      <div class="col d-flex flex-column align-items-center py-5">
        <div class="title">
          Request Body
        </div>
        <small>
          Request body is not required for this type of request.
        </small>
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
</style>