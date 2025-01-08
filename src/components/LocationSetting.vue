<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700">
      <div class="tw-heading mb-0 mt-2">Your Location</div>
      <div class="text-xl text-gray-600 mb-5">Set your location to find books near you</div>

      <LocationSelectionMap></LocationSelectionMap>

      <div class="w-full mb-2 flex flex-row space-x-16 mt-5">
        <button @click="skipLocationSetting"
                class="btn-primary btn-blue bg-blue-600 hover:bg-blue-700 w-[50%] rounded-2xl">
          Skip
        </button>
        <button
          :disabled="isLoading"
          @click="handleLocationSetting"
          class="w-[50%] btn-primary btn-blue rounded-2xl"
          type="submit"
        >
          <div class="flex items-center justify-center">
            <div v-if="isLoading" class="tw-loading-animation"></div>
            <div class="ml-2">Create Account</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>

import {ref} from "vue";
import router from "@/router/index.ts";
import LocationSelectionMap from "@/components/LocationSelectionMap.vue";

let isLoading = ref(false);

const skipLocationSetting = async () => {
  await router.push("/login");
}

const handleLocationSetting = async () => {
  try {
    isLoading.value = true;

    // Handling location setting

    await router.push("/login");

  } catch (e) {

  } finally {
    isLoading.value = false;
  }
}

</script>
