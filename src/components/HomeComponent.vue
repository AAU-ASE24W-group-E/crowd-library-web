<template>
  <div class="tw-component-container">
    <div class="text-center">
      <h1 class="tw-heading  text-[30px] text-gray-600">{{ message }}</h1>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue';

const message = ref('Welcome to Crowd Library!');

</script>

