<template>
  <div class="tw-component-container px-0">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:flex-col">
      <div>
        <h1 class="tw-subheading text-[30px]">Book List</h1>
      </div>
      <button @click="toggleAddBook" class="btn-primary btn-green">
        <font-awesome-icon class="tw-icon text-gray-100" :icon="faPlus" />
      </button>
    </div>
    <UserLibraryAddBook v-show="showAddBook" />

    <div v-show="!showAddBook" class="space-y-6 w-full mt-4">
        <BookEntry
          v-for="(book, index) in mybooks"
          :key="index"
          :isMyBook="true"
          :book="book"
          @handleAction="handleAction"
        />

        <BookLibraryPopup
          v-if="showPopup"
          :popupBook="popupBookRef"
          :popupType="popupTypeRef"
          @close="handlePopUpClosed"
        ></BookLibraryPopup>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserLibraryAddBook from '@/components/user-library/UserLibraryAddBook.vue';
import BookLibraryPopup from './BookLibraryPopup.vue';
import BookEntry from '@/components/BookEntry.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const showAddBook = ref(false);
const showPopup = ref(false);
const popupBookRef = ref(null);
const popupTypeRef = ref(null);
const props = defineProps(['mybooks']);

const mybooks = ref(props.mybooks);

const handleAction = (book, type) => {
  console.log(book);
  popupBookRef.value = book;
  popupTypeRef.value = type;
  showPopup.value = true;
};

const toggleAddBook = () => {
  showAddBook.value = !showAddBook.value;
};

const handlePopUpClosed = (actionFinished, editedfields) => {
  if (actionFinished) {
    switch (popupTypeRef.value) {
      case 'EDIT':
        // in editfields are the new values
        // TODO update book
        break;
      case 'DELETE':
        // TODO delete book
        break;
    }
    // TODO get books
  }
  showPopup.value = false;
};
</script>
