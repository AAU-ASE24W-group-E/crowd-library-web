<template>
  <div
    @click="toggleDropdown"
    class="tw-component-container w-full bg-white dark:bg-dark-mode-inside shadow-md rounded-lg border border-gray-200 dark:border-gray-600 transition duration-500 ease-in-out hover:scale-101 animate-fade-in relative cursor-pointer">
    <div class="flex flex-row w-full">
      <img
        src="../assets/logo_simple.png"
        alt="logo"
        class="object-contain decoration-0 mr-3 max-[480px]:hidden"
      />
      <div class="flex flex-col flex-grow">
        <span
          class="text-xl font-semibold dark:text-title-dark-mode-text">{{ book.title }} ({{
            book.year
          }}) by {{ book.author }}</span>
        <div class="flex flex-row max-sm:flex-col max-sm:mt-2 sm:space-x-8 max-sm:space-y-2">
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">Publisher: <span
              class="tw-book-entry-info-value">{{ book.publisher }}</span></span>
            <span class="tw-book-entry-info-title">Format: <span
              class="tw-book-entry-info-value">{{ book.format }}</span></span>
            <span class="tw-book-entry-info-title">Language: <span
              class="tw-book-entry-info-value">{{ book.language }}</span></span>
          </div>
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">ISBN: <span
              class="tw-book-entry-info-value">{{ book.ISBN }}</span></span>
            <span v-if="isSearchBook"  class="tw-book-entry-info-title">Owner: <span class="tw-book-entry-info-value">{{ book.owner }}</span></span>
            <span v-if="!isNewBook" class="tw-book-entry-info-title">Status: <span
              :class="{'text-green-500': book.isAvailable, 'text-red-500': !book.isAvailable}">
              {{ book.status }}</span></span>
          </div>
          <div v-if="book.isAvailable && !isNewBook" class="flex flex-col">
             <span class="tw-book-entry-info-title">Lendable:
               <span :class="{'text-green-500': book.isLendable, 'text-red-500': !book.isLendable}">
                 {{ book.isLendable ? 'Yes' : 'No' }}
               </span>
              </span>

            <span class="tw-book-entry-info-title">
              Exchangeable:
              <span :class="{'text-green-500': book.isExchangeable, 'text-red-500': !book.isExchangeable}">
                {{ book.isExchangeable ? 'Yes' : 'No' }}
              </span>
            </span>

            <span class="tw-book-entry-info-title">
              Giftable:
              <span :class="{'text-green-500': book.isGiftable, 'text-red-500': !book.isGiftable}">
                {{ book.isGiftable ? 'Yes' : 'No' }}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center ml-2">
        <font-awesome-icon :icon="faChevronRight" class="tw-icon"
                           :class="{ 'rotate-90': dropdownOpen }"></font-awesome-icon>
      </div>
    </div>
    <div
      v-bind:class="{
        'max-h-0 overflow-hidden': !dropdownOpen,
        'max-h-40 overflow-hidden': dropdownOpen,
      }"
      class="transition-all duration-300 ease-in-out w-full"
    >
      <div
        class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0">
        <button v-if="!isWishlist && isSearchBook" class="btn-primary btn-gray rounded-2xl">
          Add to wishlist
        </button>
        <button v-if="isSearchBook" @click="openPopup" class="btn-primary btn-green rounded-2xl">Send Request</button>
        <button v-if="isSearchBook" @click="handleShowOnMap" class="btn-primary btn-green rounded-2xl">Show on Map</button>
        <button v-if="isMyBook" @click="handleEditState" class="edit-button btn-primary btn-green rounded-2xl">Edit State</button>
        <button v-if="isMyBook" @click="handleDelete" class="delete-button btn-primary btn-gray rounded-2xl">Delete</button>
        <button v-if="isNewBook" @click="handleAdd" class="add-btn-of-book btn-primary btn-green rounded-2xl">Add Book</button>
      </div>
    </div>
  </div>
  <SendRequestPopup ref="requestPopup" :book="book"/>
</template>

<script setup>
import {  defineProps, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SendRequestPopup from './SendRequestPopup.vue';

const emit = defineEmits(['showOnMapClicked', 'handleAction', 'handleAdd']);

const requestPopup = ref(null);

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  isWishlist: {
    type: Boolean,
    default: false,
  },
  isSearchBook:{
    type: Boolean,
    default: false,
  },
  isMyBook: {
    type: Boolean,
    default: false,
  },
  isNewBook: {
    type: Boolean,
    default: false,
  },
});

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function handleShowOnMap() {
  emit('showOnMapClicked', props.book);
}

function handleEditState() {
  emit('handleAction', props.book, "EDIT");
}

function handleDelete() {
  emit('handleAction', props.book, "DELETE");
}

function handleAdd() {
  emit('handleAdd', props.book);
}

// Function to open the popup
const openPopup = () => {
  requestPopup.value.show();
};
</script>

<!--<style>
.tw-book-entry-info-title {
  @apply text-sm dark:text-title-dark-mode-text;
}

.tw-book-entry-info-value {
  @apply text-gray-600 dark:text-gray-400;
}
</style>-->
