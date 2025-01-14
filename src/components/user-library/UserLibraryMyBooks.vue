<template>

  <UserLibraryAddBook v-show="showAddBook"/>
  
</template>
  
  <script setup>
    import { ref } from 'vue';
    import UserLibraryAddBook from '@/components/user-library/UserLibraryAddBook.vue'
    const showAddBook = ref(true);
  </script>
  