<template>
    <div v-if="isVisible" class="popup-overlay" @click="hide">
      <div class="popup-content" @click.stop>
        <button @click="hide" class="popup-close-btn">X</button>
        <slot></slot> <!-- Pass content here  -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isVisible = ref(false);
  
  // Function to show the popup
  const show = () => {
    isVisible.value = true;
  };
  
  // Function to hide the popup
  const hide = () => {
    isVisible.value = false;
  };
  
  defineExpose({
    show,
    hide
  });
  </script>
  