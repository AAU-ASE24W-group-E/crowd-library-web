<template>
    <div class="tw-component-container" ref="dropdownRef">
        <div class="flex flex-row w-full justify-between items-center max-[480px]:justify-center" />
        <Tabs>
            <Tab title="Incoming Requests" name="incomingTab">
                <RequestList v-show="showRequestList" :requests="bookRequests" />
            </Tab>
            <Tab title="Outgoing Requests" name="outgoingTab" />
        </Tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import RequestList from './RequestList.vue';
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
const showRequestList = ref(true);

const route = useRoute();
const query = route.query.q || null;

const bookRequests = ref([
    {
        title: 'The Forgotten Forest',
        year: '2015',
        author: 'Alice Morningstar',
        publisher: 'Whispering Pines',
        format: 'Paperback',
        language: 'EN',
        ISBN: '1122334455',
        owner: 'Owner1',
        lat: 46.617415,
        long: 14.263625,
    },
    {
        title: 'Whispers of the Sea',
        year: '2020',
        author: 'John Saltsworth',
        publisher: 'Ocean Breeze Press',
        format: 'Hardcover',
        language: 'EN',
        ISBN: '2233445566',
        owner: 'Owner2',
        lat: 46.619025,
        long: 14.265755,
    },
    {
        title: 'A Dance in the Rain',
        year: '2019',
        author: 'Elena Storm',
        publisher: 'Rainfall Publishing',
        format: 'Paperback',
        language: 'ES',
        ISBN: '3344556677',
        owner: 'Owner3',
        lat: 46.622305,
        long: 14.272915,
    }
]);

</script>