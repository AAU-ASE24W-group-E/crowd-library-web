<template>
  <div
    class="tw-component-container dark:bg-dark-mode-inside rounded-lg py-3 mt-2 h-16 border-1"
  >
    <!--Browser-->
    <div class="w-full h-full flex items-center justify-between">
      <router-link to="/">
        <img
          :src="config.NAVBAR_LOGO_SRC"
          alt="logo"
          class="h-8 w-40 object-contain pr-8 max-lg:p-0 decoration-0"
        />
      </router-link>
      <!--      TODO-->
    </div>
  </div>
</template>


<script setup>
//
import {config} from "@vue/test-utils";
</script>
