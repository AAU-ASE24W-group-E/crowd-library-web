<template>
  <div class="w-full">
    <div class="dark:text-title-dark-mode-text mt-2" >You can search for books in our system to add them to your own book list.</div>

    <div class="relative w-full max-sm:hidden mt-4">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300 ml-5" :icon="faSearch" />
      </div>
      <input
        class="tw-input w-full rounded-3xl h-9 ml-5"
        id="search-input"
        @keyup.enter="handleSearch($event)"
        v-model="searchInput"
        :placeholder="'Search existing book by title or author...'"
      />
    </div>
    <div class="space-y-6 w-full m-4">
      <div  v-if="foundBooks.length > 0">
      <BookEntry
        v-for="(book, index) in foundBooks"
        :key="index"
        :book="book"
        :isNewBook="true"
        @handleAdd="handleAdd"
      />
    </div>
      <hr class="divide-line mt-10" />
      <div class="add-book-by-isbn">
        <a
          class="tw-link-style mr-5"
          href="https://www.youtube.com/watch?v=kE03lYoVpFg&autoplay=1"
          target="_blank"
        >
          These are not the <em>books</em> that you are looking for? Do you want to add a new
          book / edition via ISBN?</a
        >
        <div class="flex flex-row w-full justify-center space-x-5">
        <input
          class="tw-input w-full max-md:w-[30%] p-2"
          v-model="isbnInput"
          id="isbn-input"
          type="text"
          :placeholder="'Enter bok ISBN to import'"
        />
        <button class="import-btn btn-primary btn-green" @click="handleImport">
          Try importing
        </button>
        </div>
      </div>
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
import { useUserStore } from '@/stores/user';

const emit = defineEmits(['handleImport', 'bookAdded']);
const userStore = useUserStore();

const isbnInput = ref('');
const searchInput = ref(null);
const foundBooks = ref([]);

const handleAdd = async (book) => {
  await bookService
    .createBookOwnership(book.id, userStore.user?.id)
    .then((response) => {
      emit('bookAdded');
      Snackbar.showSnackbar(book.title + ' was added to your library.', SnackbarType.SUCCESS);
    })
    .catch((error) => {
      Snackbar.showSnackbar('There was an error adding the book. Check console.', SnackbarType.ERROR);
      console.log(error.status);
    });
};

const handleSearch = async () => {
  const inputValue = searchInput.value;
  if (inputValue === null || inputValue === undefined || inputValue === '' || inputValue.length == 1) {
    return;
  }
  await bookService
    .findBookByQuicksearch(inputValue)
    .then((books) => {
      foundBooks.value = books;
    })
    .catch((error) => {
      console.log(error.status);
    });
};

const handleImport = async () => {
  if (isbnInput.value.trim() === '') {
    Snackbar.showSnackbar('Please enter an ISBN.', SnackbarType.WARN);
    return;
  }
  Snackbar.showSnackbar('We are trying to import the book.', SnackbarType.GENERAL);
  await bookService
    .importBookByIsbn(isbnInput.value)
    .then((book) => {
      let importBook = book;
      searchInput.value = book.title;
      Snackbar.showSnackbar('Successfully imported ' + importBook.title, SnackbarType.SUCCESS);
      handleSearch();
      isbnInput.value = undefined;
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
  @apply flex flex-row max-md:flex-col w-full sm:items-center items-center justify-center sm:justify-end sm:space-x-5 space-y-2 sm:space-y-0;
}
</style>
