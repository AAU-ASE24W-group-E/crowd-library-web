<template>
    <div class="tw-component-container" ref="dropdownRef">
        <div class="flex flex-row w-full justify-between items-center max-[480px]:justify-center" />
        <Tabs>
            <Tab title="Incoming Requests" name="incomingTab">
                <RequestList v-show="showRequestList" :requests="incomingRequests" :incoming="true" />
            </Tab>
            <Tab title="Outgoing Requests" name="outgoingTab">
                <RequestList v-show="showRequestList" :requests="outgoingRequests" :incoming="false" />
            </Tab>
        </Tabs>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import RequestList from './RequestList.vue';
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
import { lendingService } from '@/services/LendingService.ts';
import { userService } from '@/services/UserService.ts';
import { bookService } from '@/services/BookService.ts';
import { useUserStore } from '@/stores/user.ts';

const showRequestList = ref(true);
const userStore = useUserStore();
const incomingRequests = ref([]);
const outgoingRequests = ref([]);

// TODO add fetchOutgoingLendings, richtig die einzelnen properties ins entry einsetzen
const fetchIncomingLendings = async ()  => {
  const ownerId = userStore.user.id;

  if(ownerId) {
    try {
      console.debug("Owner Id" + ownerId);
      const lendings = await lendingService.getLendingsByOwnerId(ownerId);
      console.debug(lendings);

      incomingRequests.value = await Promise.all(
        lendings.data.map(async (lending) => {
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
        })
      );

    } catch(e) {
      // TODO proper handling
      console.error(e);
    }
  }
}

onMounted(() => {
  fetchIncomingLendings();
})

</script>
