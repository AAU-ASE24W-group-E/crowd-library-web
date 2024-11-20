<template>
  <!-- Template represents html -->
  <div class="tw-component-container">
    <div class="text-center">
      <h1 class="text-green-600">{{ message }}</h1>
      <button class="bg-green-700 hover:bg-green-800 text-white p-3 rounded cursor-pointer border-none"
              @click="updateMessage">Klick mich
      </button>
    </div>
  </div>
</template>
<script setup>
// Logic of the component gets defined (like in angular the .ts file of the component)
import {ref} from 'vue';

// Reactive variable
const message = ref('Hallo, Vue11!');

// Function that changes the value of a message
const updateMessage = () => {
  message.value = 'Die Nachricht wurde aktualisiert!';
};
</script>

<style scoped>
/*Styling related stuff - Will not be used since we use tailwind */
</style>
