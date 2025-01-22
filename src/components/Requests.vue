<template>
  <div class="tw-component-container" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:justify-center" />
    <Tabs>
      <Tab :title="incomingRequestTitle" name="incomingTab">
        <RequestList
          v-show="showRequestList"
          :requests="incomingRequests"
          :incoming="true"
          @refreshIncomingRequests="fetchIncomingLendingRequests"
        />
      </Tab>
      <Tab :title="outgoingRequestTitle" name="outgoingTab">
        <RequestList
          v-show="showRequestList"
          :requests="outgoingRequests"
          :incoming="false"
          @refreshOutgoingRequests="fetchOutgoingLendingRequests"
        />
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import RequestList from './RequestList.vue';
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
import { lendingService } from '@/services/LendingService.ts';
import { userService } from '@/services/UserService.ts';
import { bookService } from '@/services/BookService.ts';
import { useUserStore } from '@/stores/user.ts';
import { LendingStatus } from '@/enums/lendingStatus.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';

const showRequestList = ref(true);
const userStore = useUserStore();
const incomingRequests = ref([]);
const outgoingRequests = ref([]);

const incomingRequestTitle = ref('Incoming Requests (0)');
const outgoingRequestTitle = ref('Outgoing Requests (0)');
const fetchIncomingLendingRequests = async () => {
  const ownerId = userStore.user.id;

  if (ownerId) {
    try {
      console.debug('Owner Id' + ownerId);
      const lendings = await lendingService.getLendingsByOwnerId(ownerId);
      console.debug(lendings);

      const filteredLendings = lendings.data.filter(
        (lending) => (checkIsStatusValid(lending)),
      );

      incomingRequestTitle.value = `Incoming Requests (${filteredLendings.length.toString()})`;

      incomingRequests.value = await Promise.all(
        filteredLendings.map(async (lending) => {
          const [readerData, bookData] = await Promise.all([
            userService.getUserById(lending.readerId),
            bookService.getBook(lending.bookId),
          ]);

          console.log(readerData);
          console.log(bookData);

          return {
            lending,
            user: readerData,
            book: bookData,
          };
        }),
      );

    } catch (e) {
      Snackbar.showSnackbar('There was an error fetching incoming request list, check console.', SnackbarType.ERROR);
      console.error(e);
    }
  }
};

const fetchOutgoingLendingRequests = async () => {
  const readerId = userStore.user.id;

  if (readerId) {
    try {
      console.debug('Reader Id' + readerId);
      const lendings = await lendingService.getLendingsByReaderId(readerId);
      console.debug(lendings);

      const filteredLendings = lendings.data.filter(
        (lending) => (checkIsStatusValid(lending)),
      );

      outgoingRequestTitle.value = `Outgoing Requests (${filteredLendings.length.toString()})`;

      outgoingRequests.value = await Promise.all(
        filteredLendings.map(async (lending) => {
          const [readerData, bookData] = await Promise.all([
            userService.getUserById(lending.ownerId),
            bookService.getBook(lending.bookId),
          ]);

          console.log(readerData);
          console.log(bookData);

          return {
            lending,
            user: readerData,
            book: bookData,
          };
        }),
      );

    } catch (e) {
      Snackbar.showSnackbar('There was an error fetching outgoing request list, check console.', SnackbarType.ERROR);
      console.error(e);
    }
  }
};

const checkIsStatusValid = (lending) => {
  return lending.status !== LendingStatus.READER_WITHDREW
    && lending.status !== LendingStatus.OWNER_DENIED
    && lending.status !== LendingStatus.LENDING_COMPLETED
    && lending.status !== LendingStatus.BORROWED
    && lending.status !== LendingStatus.READER_RETURNED_BOOK
    && lending.status !== LendingStatus.OWNER_CONFIRMED_TRANSFER;
};

onMounted(() => {
  fetchIncomingLendingRequests();
  fetchOutgoingLendingRequests();
});

</script>
