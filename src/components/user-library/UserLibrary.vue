<template>
  <!-- TODO tabs -->
  <UserLibraryMyBooks :mybooks="mybooks"/>
</template>
  
  <script setup>
  import {ref} from 'vue';
  import UserLibraryMyBooks from '@/components/user-library/UserLibraryMyBooks.vue';

  const mybooks = ref([
  {
    title: 'The Forgotten Forest',
    year: '2015',
    author: 'Alice Morningstar',
    publisher: 'Whispering Pines',
    format: 'Paperback',
    language: 'EN',
    ISBN: '1122334455',
    owner: 'Owner1',
    isAvailable: true,
    isLendable: true,
    isExchangeable: false,
    isGiftable: true,
    status: 'Available',
    lat: 46.617415,
    long: 14.263625,
  },
  {
    title: 'Whispers of the Sea',
    year: '2020',
    author: 'John Saltsworth',
    publisher: 'Ocean Breeze Press',
    format: 'Hardcover',
    language: 'EN',
    ISBN: '2233445566',
    owner: 'Owner1',
    isAvailable: false,
    isLendable: false,
    isExchangeable: true,
    isGiftable: false,
    status: 'Unavailable',
    lat: 46.619025,
    long: 14.265755,
  }
]);
  </script>
  
  <style>
  </style>
  