<script setup lang="ts">
import {onMounted} from "vue";
import VerbPanel from "@/components/home/left-navigation/VerbPanel.vue";
import {ref, computed} from "vue";
import AppBar from "@/components/home/left-navigation/AppBar.vue";

const supportedVerbs = ref([]);
const metadata = ref(null);

onMounted(() => {
  fetch("http://localhost:3000/metadata")
      .then((response) => response.json())
      .then((data) => {
        metadata.value = data;
        supportedVerbs.value = [
          {
            label: "GET",
            description: `Get all resource from ${data.name} file.`,
            suffix: ""
          },
          {
            label: "POST",
            description: `Create a new resource in ${data.name} file.`,
            suffix: ""
          },
          {
            label: "PUT",
            description: `Update an existing resource in ${data.name} file.`,
            suffix: "/:id"
          },
          {
            label: "DELETE",
            description: `Delete an existing resource in ${data.name} file.`,
            suffix: "/:id"
          }
        ]
      });
});

</script>

<template>
  <div class="menu-wrapper h-100">
    <!--    AppBar-->
    <AppBar/>
    <hr>
    <!--    API Endpoints-->
    <div class="mt-3">
      <div class="px-5 mb-2">
        <div class="alert-primary" role="alert">
          All available API endpoints for <strong class="highlight">{{ metadata ? metadata.name : '' }}</strong> file.
          Click on any of the endpoints to see the details.
        </div>
      </div>
      <VerbPanel @click="$emit('endpoint-selected', {verb: verb, metadata: metadata})" v-for="verb in supportedVerbs"
                 :key="verb.label" :verb="verb" :resource="metadata"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-wrapper {
  background-color: $secondary-color;
}
</style>