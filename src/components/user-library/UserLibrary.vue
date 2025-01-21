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
      <UserLibraryMyBooks />
    </div>
    <div v-show="activeTab === 'borrowedBooksTab'">
      <UserLibraryBorrowedBooks/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserLibraryMyBooks from '@/components/user-library/UserLibraryMyBooks.vue';
import UserLibraryBorrowedBooks from '@/components/user-library/UserLibraryBorrowedBooks.vue';

const activeTab = ref('myBooksTab');


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
