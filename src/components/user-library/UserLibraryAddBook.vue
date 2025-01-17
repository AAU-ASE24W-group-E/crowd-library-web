<template>
  <div class="w-full">
    <div class="relative w-full max-sm:hidden mt-10">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300 ml-5" :icon="faSearch" />
      </div>
      <input
        class="tw-input w-full rounded-3xl h-9 ml-5"
        @keyup.enter="handleSearch($event)"
        :placeholder="'Search by title, author, ISBN...'"
      />
    </div>
    <div class="space-y-6 w-full m-4">
      <BookEntry
        v-for="(book, index) in foundBooks"
        :key="index"
        :isNewBook="true"
        :book="book"
        @handleAdd="handleAdd"
      />
      <hr class="divide-line" />
      <div class="add-book-by-isbn">
        <a
          class="tw-link-style mr-5"
          href="https://www.youtube.com/watch?v=kE03lYoVpFg&autoplay=1"
          target="_blank"
        >
          These are not the <em>books</em> that you are looking for? Do you want to add a new
          edition via ISBN?</a
        >
        <input
          class="tw-input sm:w-[20%] w-full p-2"
          v-model="isbnInput"
          id="isbn-input"
          type="text"
          :placeholder="'Enter ISBN of the book you want to import'"
        />
        <button class="import-btn btn-primary btn-green" @click="handleImport">
          Try importing
        </button>
      </div>
      <!-- v-bind:class="{ 'tw-input-error': isControlInvalid('usernameOrEmail') }" -->
      <!-- @blur="handleBlur('usernameOrEmail')" -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BookEntry from '@/components/BookEntry.vue';
import { SnackbarType } from '@/enums/snackbar.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { bookService } from '@/services/BookService';

const emit = defineEmits(['handleImport']);

const isbnInput = ref('');
const foundBooks = ref([
  {
    book: {
      id: '1',
      title: 'The Forgotten Forest',
      isbn: '1122334455',
      publisher: 'Whispering Pines',
      publishYear: 2015,
      coverId: '14625765-L',
      edition: 'First Edition',
      format: 'Paperback',
      authors: ['Alice Morningstar'],
      languages: ['EN'],
    },
  },
  {
    book: {
      id: '2',
      title: 'Whispers of the Sea',
      isbn: '2233445566',
      publisher: 'Ocean Breeze Press',
      publishYear: 2020,
      coverId: '14625766-L',
      edition: 'First Edition',
      format: 'Hardcover',
      authors: ['John Saltsworth'],
      languages: ['EN'],
    },
  },
  {
    book: {
      id: '3',
      title: 'A Dance in the Rain',
      isbn: '3344556677',
      publisher: 'Rainfall Publishing',
      publishYear: 2019,
      coverId: '14625767-L',
      edition: 'Second Edition',
      format: 'Paperback',
      authors: ['Elena Storm'],
      languages: ['ES'],
    },
  },
]);

const handleAdd = (book) => {
  // TODO handle add book
  //Snackbar.showSnackbar('Book was added to your library.', SnackbarType.SUCCESS);
};

const handleImport = async () => {
  if (isbnInput.value.trim() === '') {
    Snackbar.showSnackbar('Please enter an ISBN.', SnackbarType.WARN);
    return;
  }
  Snackbar.showSnackbar('We are trying to import the book.', SnackbarType.GENERAL);
  await bookService.importBookByIsbn(isbnInput.value)
  .then((book) => {
    let importBook = book;
    Snackbar.showSnackbar('Successfully imported ' + importBook.title, SnackbarType.SUCCESS);
  })
  .catch((error) => {
    console.log(error.status);
  });
};
</script>
<style setup>
.divide-line {
  @apply border border-blue-800 my-5 dark:border-gray-300;
}

.add-book-by-isbn {
  @apply flex flex-col sm:flex-row w-full sm:items-center items-center justify-center sm:justify-end sm:space-x-5 space-y-2 sm:space-y-0;
}
</style>
