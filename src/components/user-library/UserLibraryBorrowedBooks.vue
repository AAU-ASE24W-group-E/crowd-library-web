<template>
    <div class="tw-component-container px-0">
      <div class="flex flex-row w-full justify-between items-center max-[480px]:flex-col">
        <div>
          <h1 class="tw-subheading text-[30px]">{{ heading }}</h1>
        </div>
        </div>
      </div>

      <div  class="borrowed-book-list space-y-6 w-full mt-4">
        <BookEntry
          v-for="(book) in myBorrowedBooks"
          :book="book.book"
          :ownBook="book"
          @handleReturnBook="handleReturnBook"
          :deadline="book.deadline"
        />

        <div v-if="myBorrowedBooks.length == 0" class="library-empty-text">
            You currently do not have any borrowed books.
        </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import BookEntry from '@/components/BookEntry.vue';
  import { bookService } from '@/services/BookService';
  import { useUserStore } from '@/stores/user';
  import { SnackbarType } from '@/enums/snackbar.ts';
  import { Snackbar } from '@/utils/snackbar.ts';
  import { lendingService } from '@/services/LendingService';
  import { LendingStatus } from '@/enums/lendingStatus';

  const userStore = useUserStore();
  const heading = ref("Borrowed Books");
  const myBorrowedBooks = ref([]);

  onMounted(() => {
    refreshBorrowedBookList();
  });

  const refreshBorrowedBookList = async () => {
    if(userStore.user == undefined) return;

    await lendingService
      .getLendingsByReaderIdAndStatus(userStore.user?.id, LendingStatus.BORROWED)
      .then(async (lendings) => {
        let availableBooks = [];
        for(let l of lendings.data) {
          await bookService.getAvailableBook(l.ownerId, l.bookId).then((book) => {
            book.data.deadline = l.lendingMeeting.deadline.split('T')[0];
            book.data.lendingId = l.id;
            availableBooks.push(book.data);
          });
        }
        myBorrowedBooks.value = availableBooks;
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const handleReturnBook = async (deadline, ownBook) => {
    await lendingService.updateLendingStatus(ownBook.lendingId, LendingStatus.READER_RETURNED_BOOK).then(() => {
      Snackbar.showSnackbar("You've returned the book successfully!", SnackbarType.SUCCESS)
    });
  }


  </script>

  <style scoped>
  .library-empty-text {
    @apply font-semibold dark:text-title-dark-mode-text;
  }
  </style>
