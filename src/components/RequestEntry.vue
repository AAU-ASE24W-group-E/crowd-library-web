<template>
  <div @click="toggleDropdown"
    class="tw-component-container w-full bg-white dark:bg-dark-mode-inside shadow-md rounded-lg border border-gray-200 dark:border-gray-600 transition duration-500 ease-in-out hover:scale-101 animate-fade-in relative cursor-pointer">
    <div class="flex flex-row w-full">
      <img src="../assets/logo_simple.png" alt="logo" class="object-contain decoration-0 mr-3 max-[480px]:hidden" />
      <div class="flex flex-col flex-grow">
        <span class="text-xl font-semibold dark:text-title-dark-mode-text">Request for {{ request.for }} (by {{
          request.from
        }}): {{ request.book.title }}</span>
        <div class="flex flex-row max-sm:flex-col max-sm:mt-2 sm:space-x-8 max-sm:space-y-2">
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">Publisher: <span class="tw-book-entry-info-value">{{
              request.book.publisher }}</span></span>
            <span class="tw-book-entry-info-title">Format: <span class="tw-book-entry-info-value">{{ request.book.format
                }}</span></span>
            <span class="tw-book-entry-info-title">Language: <span class="tw-book-entry-info-value">{{
              request.book.language }}</span></span>
          </div>
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">ISBN: <span class="tw-book-entry-info-value">{{ request.book.ISBN
                }}</span></span>
            <span class="tw-book-entry-info-title">Date: <span class="tw-book-entry-info-value">{{ request.date
                }}</span></span>
            <span class="tw-book-entry-info-title">Place: <span class="tw-book-entry-info-value">{{ request.place
                }}</span></span>
          </div>
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">Due date: <span class="tw-book-entry-info-value">{{ request.due_date
                }}</span></span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center ml-2">
        <font-awesome-icon :icon="faChevronRight" class="tw-icon"
          :class="{ 'rotate-90': dropdownOpen }"></font-awesome-icon>
      </div>
    </div>
    <div v-bind:class="{
      'max-h-0 overflow-hidden': !dropdownOpen,
      'max-h-40 overflow-hidden': dropdownOpen,
    }" class="transition-all duration-300 ease-in-out w-full">
      <div
        class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0">
        <button v-show="dropdownOpen" id="declineBtn" class="btn-primary btn-gray rounded-2xl">Withdraw</button>
        <button v-show="dropdownOpen" id="declineBtn" class="btn-primary btn-gray rounded-2xl">Decline</button>
        <button v-show="dropdownOpen" id="suggestMeetingBtn" class="btn-primary btn-green rounded-2xl">Suggest
          Meeting</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  request: {
    type: Object,
    required: true,
  },
  isWishlist: {
    type: Boolean,
    default: false,
  },
});

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

</script>