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
          @handleAction="handleAction"
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
//   const myBorrowedBooks = ref( [
//   {
//     deadline: "10.12.2025",
//     book: {
//       id: '1',
//       title: 'The Forgotten Forest',
//       isbn: '1122334455',
//       publisher: 'Whispering Pines',
//       publishYear: 2015,
//       coverId: '14625765-L',
//       edition: 'First Edition',
//       format: 'Paperback',
//       authors: ['Alice Morningstar'],
//       languages: ['EN'],
//     },
//     lendable: true,
//     giftable: true,
//     exchangeable: false,
//     status: "AVAILABLE", // Available
//     distance: 0,
//     owner: {
//       id: 'Owner1',
//       name: 'Owner1',
//       latitude: 46.617415,
//       longitude: 14.263625,
//     },
//   },
//   {
//     deadline: "10.12.2025",
//     book: {
//       id: '2',
//       title: 'Whispers of the Sea',
//       isbn: '2233445566',
//       publisher: 'Ocean Breeze Press',
//       publishYear: 2020,
//       coverId: '14625766-L',
//       edition: 'First Edition',
//       format: 'Hardcover',
//       authors: ['John Saltsworth'],
//       languages: ['EN'],
//     },
//     lendable: false,
//     giftable: false,
//     exchangeable: true,
//     status: "UNAVAILABLE", // Unavailable
//     distance: 0,
//     owner: {
//       id: 'Owner2',
//       name: 'Owner2',
//       latitude: 46.619025,
//       longitude: 14.265755,
//     },
//   },
//   {
//     deadline: "10.12.2025",
//     book: {
//       id: '3',
//       title: 'A Dance in the Rain',
//       isbn: '3344556677',
//       publisher: 'Rainfall Publishing',
//       publishYear: 2019,
//       coverId: '14625767-L',
//       edition: 'Second Edition',
//       format: 'Paperback',
//       authors: ['Elena Storm'],
//       languages: ['ES'],
//     },
//     lendable: true,
//     giftable: false,
//     exchangeable: false,
//     status: "AVAILABLE", // Available
//     distance: 0,
//     owner: {
//       id: 'Owner3',
//       name: 'Owner3',
//       latitude: 46.622305,
//       longitude: 14.272915,
//     },
//   },
// ]);

  onMounted(() => {
    refreshBorrowedBookList();
  });
  
  const refreshBorrowedBookList = async () => {
    if(userStore.user == undefined) return;

    await lendingService
      .getLendingsByReaderIdAndStatus(userStore.user?.id, LendingStatus.OWNER_CONFIRMED_TRANSFER)
      .then(async (lendings) => {
        console.log(lendings.data)
        // const availableBooksPromises = lendings.map((lending) =>
        //   bookService.getAvailableBook(lending.ownerId, lending.bookId)
        // );
        // const availableBooks = await Promise.all(availableBooksPromises);

        // console.log(availableBooks)
      })
      .catch((error) => {
        console.log(error.status);
      });
  };
  </script>
  
  <style scoped>
  .library-empty-text {
    @apply font-semibold dark:text-title-dark-mode-text;
  }
  </style>
  