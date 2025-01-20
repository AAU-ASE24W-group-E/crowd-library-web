<template>
  <div class="tw-component-container px-0">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:flex-col">
      <div>
        <h1 class="tw-subheading text-[30px]">Book List</h1>
      </div>
      <div>
        <button
          v-show="showAddBook"
          @click="toggleAddBook('cancel')"
          class="cancel-adding-btn btn-primary btn-gray"
        >
          Go back
        </button>
        <button
          @click="toggleAddBook"
          v-show="!showAddBook"
          class="add-book-btn btn-primary btn-green"
        >
          <font-awesome-icon class="add-icon tw-icon text-gray-100" :icon="faPlus" />
        </button>
      </div>
    </div>
    <UserLibraryAddBook v-show="showAddBook" @bookAdded="refreshMyBookList" />

    <div v-show="!showAddBook" class="my-book-list space-y-6 w-full mt-4">
      <BookEntry
        v-for="(book, index) in mybooks"
        :key="index"
        :isMyBook="true"
        :book="book.book"
        :ownBook="book"
        @handleAction="handleAction"
      />

      <div v-if="mybooks.length == 0" class="library-empty-text">
        Your library is empty - add your books using the + button!
      </div>

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
import { ref, onMounted } from 'vue';
import UserLibraryAddBook from '@/components/user-library/UserLibraryAddBook.vue';
import BookLibraryPopup from './BookLibraryPopup.vue';
import BookEntry from '@/components/BookEntry.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { bookService } from '@/services/BookService';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const showAddBook = ref(false);
const showPopup = ref(false);
const popupBookRef = ref(null);
const popupTypeRef = ref(null);

const mybooks = ref([]);

const handleAction = (book, type) => {
  popupBookRef.value = book;
  popupTypeRef.value = type;
  showPopup.value = true;
};

onMounted(() => {
  refreshMyBookList();
});

const refreshMyBookList = async () => {
  if(userStore.user?.id == undefined) return
  await bookService
    .findOwnBooks(userStore.user?.id)
    .then((books) => {
      mybooks.value = books.data;
    })
    .catch((error) => {
      console.log(error.status);
    });
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
        // SNackbar
        break;
      case 'DELETE':
        // TODO delete book
        // SNackbar
        break;
    }
    // TODO get books
  }
  showPopup.value = false;
};
</script>

<style scoped>
.library-empty-text {
  @apply font-semibold dark:text-title-dark-mode-text;
}
</style>
