<template>
  <div class="tabs-wrapper">
    <!-- Tabs Header -->
    <div class="tabs-header flex border-b-2 mb-4">
      <button
        v-bind:class="{ 'active-tab': activeTab === 'myBooksTab' }"
        @click="setActiveTab('myBooksTab')"
        class="tab-button"
      >
        My Books
      </button>
      <button
        v-bind:class="{ 'active-tab': activeTab === 'borrowedBooksTab' }"
        @click="setActiveTab('borrowedBooksTab')"
        class="tab-button"
      >
        Borrowed Books
      </button>
    </div>

    <div v-show="activeTab === 'myBooksTab'">
      <UserLibraryMyBooks :mybooks="mybooks" />
    </div>
    <div v-show="activeTab === 'borrowedBooksTab'">
      <!-- BorrowedBooks COmponent TODO -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserLibraryMyBooks from '@/components/user-library/UserLibraryMyBooks.vue';

const activeTab = ref('myBooksTab');

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
  },
]);

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<style scoped>
.tab-button {
  @apply py-2 px-6 text-lg font-medium
  text-gray-700
  dark:text-gray-100
  hover:text-blue-500 focus:outline-none;
}

.tabs-wrapper {
  @apply w-[90%]
  mt-5
  p-2
  max-sm:w-full;
}
.tabs-header button {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.tabs-header button:hover {
  @apply
  bg-[#f0f0f0]
  dark:bg-gray-500
  text-[#6584ad]
  dark:text-[#f0f0f0];
}

.tabs-header button.active-tab {
  border-bottom: 2px solid #6584ad;
  @apply bg-[#f0f0f0]
  dark:bg-gray-600
  text-[#6584ad]
  dark:text-[#c6d8f1];
}
</style>
