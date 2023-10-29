<script setup lang="ts">
import {onMounted} from "vue";
import VerbPanel from "@/components/home/left-navigation/VerbPanel.vue";
import {ref, computed} from "vue";

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
            description: `Get all resource from ${data.name}`,
            suffix: ""
          },
          {
            label: "POST",
            description: `Create a new resource in ${data.name}`,
            suffix: ""
          },
          {
            label: "PUT",
            description: `Update an existing resource in ${data.name}`,
            suffix: "/:id"
          },
          {
            label: "DELETE",
            description: `Delete an existing resource in ${data.name}`,
            suffix: "/:id"
          }
        ]
      });
});
</script>

<template>
  <div class="menu-wrapper h-100">
    <!--    AppBar-->
    <!--    API Endpoints-->
    <div class="mt-3">
      <VerbPanel v-for="verb in supportedVerbs" :key="verb.label" :verb="verb" :resource="metadata"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-wrapper {
  background-color: $secondary-color;
}
</style>