<template>
  <div class="tw-component-container px-0">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:flex-col">
      <div>
        <h1 class="tw-subheading text-[30px]">{{ heading }}</h1>
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
        v-for="(book) in mybooks"
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
import { SnackbarType } from '@/enums/snackbar.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { lendingService } from '@/services/LendingService';
import { LendingStatus } from '@/enums/lendingStatus';

const userStore = useUserStore();

const showAddBook = ref(false);
const showPopup = ref(false);
const popupBookRef = ref(null);
const popupTypeRef = ref(null);
const heading = ref("Book List");

const mybooks = ref([]);

const handleAction = (book, type) => {
  popupBookRef.value = book;
  popupTypeRef.value = type;
  showPopup.value = true;
};

onMounted(() => {
  refreshMyBookList();
});

const checkIfLentBookWasReturned = async (book) => {
  return lendingService.getLendingsByOwnerId(userStore.user.id).then((lendings) => {
    for (let l of lendings.data) {
      if (l.bookId == book.book.id && l.status == "READER_RETURNED_BOOK") {
        return { "lendingId": l.id, "isReturned": true};
      }
    }
    return undefined;
  });
};

const refreshMyBookList = async () => {
  if(userStore.user == undefined) return
  await bookService
    .findOwnBooks(userStore.user?.id)
    .then(async (books) => {
      for(let b of books.data){
        if(b.status == "LENT"){
          await checkIfLentBookWasReturned(b).then((value) => {
            b.lendingState = value;
          });
        }
        else b.lendingState = undefined;
      }
      mybooks.value = books.data;
    })
    .catch((error) => {
      console.log(error.status);
    });
};

const toggleAddBook = () => {
  if(heading.value == "Book List") heading.value = "Add Books";
  else heading.value = "Book List";
  showAddBook.value = !showAddBook.value;
};

const handleFlagPayload = (editedfields) => {
    let payload = { };
    if(editedfields.status.value == true) payload.status = "AVAILABLE"
    else payload.status = "UNAVAILABLE"

    payload.lendable = editedfields.lendable.value;
    payload.exchangeable = editedfields.exchangeable.value;
    payload.giftable = editedfields.giftable.value;
    console.log(payload);
    return payload;
}

const handlePopUpClosed = async (actionFinished, ownBook, editedfields) => {
  showPopup.value = false;
  if(userStore.user?.id == undefined) return;
  if(ownBook == undefined) return;
  if(editedfields == undefined) return;

  if (actionFinished) {
    switch (popupTypeRef.value) {
      case 'EDIT':
        await bookService
          .updateBookFlags(userStore.user?.id, ownBook.book?.id, handleFlagPayload(editedfields))
          .then(() => {
            Snackbar.showSnackbar('Status of ' + ownBook.book?.title + ' was udpated.', SnackbarType.SUCCESS);
          })
          .catch((error) => {
            console.log(error.status);
          });
        break;
      case 'CONFIRM_RETURN':
        await lendingService
          .updateLendingStatus(ownBook.lendingState.lendingId, LendingStatus.OWNER_CONFIRMED_RETURNAL)
          .then(() => {
            Snackbar.showSnackbar('You confirmed that you got your book back!', SnackbarType.SUCCESS);
          })
          .catch((error) => {
            console.log(error.status);
          });
        break;
    }
    refreshMyBookList();
  }
};
</script>

<style scoped>
.library-empty-text {
  @apply font-semibold dark:text-title-dark-mode-text;
}
</style>
