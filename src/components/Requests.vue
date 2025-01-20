<template>
    <div class="tw-component-container" ref="dropdownRef">
        <div class="flex flex-row w-full justify-between items-center max-[480px]:justify-center" />
        <Tabs>
            <Tab title="Incoming Requests" name="incomingTab">
                <RequestList v-show="showRequestList" :requests="getIncomingRequests(username, incomingRequests)" :incoming="true" />
            </Tab>
            <Tab title="Outgoing Requests" name="outgoingTab">
                <RequestList v-show="showRequestList" :requests="getOutgoingRequests(username, outgoingRequests)" :incoming="false" />
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

const route = useRoute();
const query = route.query.q || null;
const username = ref("User1")
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

function getIncomingRequests(user, requests) {
    return requests.filter(request => request.to === user);
}

function getOutgoingRequests(user, requests) {
    return requests.filter(request => request.from === user);
}

onMounted(() => {
  fetchIncomingLendings();
})

/*const bookRequests = ref([
    {
        from: "User1",
        to: "User2",
        for: "Lending",
        place: "-",
        date: '-',
        due_date: '1.1.2001',
        book: {
            title: 'The Forgotten Forest',
            year: '2015',
            author: 'Alice Morningstar',
            publisher: 'Whispering Pines',
            format: 'Paperback',
            language: 'EN',
            ISBN: '1122334455',
            owner: 'User1',
            lat: 46.617415,
            long: 14.263625,
        }
    },
    {
        from: "User1",
        to: "User2",
        for: "Lending",
        place: "-",
        date: '-',
        due_date: '1.1.2001',
        book: {
            title: 'Whispers of the Sea',
            year: '2020',
            author: 'John Saltsworth',
            publisher: 'Ocean Breeze Press',
            format: 'Hardcover',
            language: 'EN',
            ISBN: '2233445566',
            owner: 'User2',
            lat: 46.619025,
            long: 14.265755,
        }
    },
    {
        from: "User2",
        to: "User1",
        for: "Lending",
        place: "-",
        date: '-',
        due_date: '1.1.2001',
        book: {
            title: 'A Dance in the Rain',
            year: '2019',
            author: 'Elena Storm',
            publisher: 'Rainfall Publishing',
            format: 'Paperback',
            language: 'ES',
            ISBN: '3344556677',
            owner: 'User2',
            lat: 46.622305,
            long: 14.272915,
        }
    }
]);*/

</script>
