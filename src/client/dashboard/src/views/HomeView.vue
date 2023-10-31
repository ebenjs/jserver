<script setup lang="ts">
import LeftNavigation from "@/components/home/LeftNavigation.vue";
import MainContent from "@/components/home/MainContent.vue";
import SubContent from "@/components/home/SubContent.vue";
import RightNavigation from "@/components/home/RightNavigation.vue";
import {ref} from "vue";

const data = ref({});
const response = ref({ isServerData: false, data: {} });
const handleEndpointSelected = (receivedData) => {
  data.value = receivedData;
}
</script>

<template>
  <main class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-lg-3 p-0">
          <LeftNavigation @endpoint-selected="handleEndpointSelected"/>
        </div>
        <div class="col-lg-6 p-0">
          <MainContent :data="data"/>
        </div>
        <div class="col-lg-3">
          <div class="row h-100">
            <div class="col-lg-10 p-0">
              <SubContent :response="response"/>
            </div>
            <div class="col-lg-2 p-0">
              <RightNavigation/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
