<template>
    <div class="tw-component-container px-0 w-full" ref="dropdownRef">
        <div class="space-y-6 w-full mt-4">
            <RequestEntry v-for="(book, index) in requests" :key="index" :book="book"/>
        </div>
    </div>
</template>

<script setup>
import RequestEntry from '@/components/RequestEntry.vue';
import { defineProps, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps(['requests']);

// Example array of books
const requests = ref(props.requests);

let dropdownSortOpen = ref(false);
const isWishlist = ref(false); // needed to determine if book entry is shown on book list or wishlist
const dropdownRef = ref(null);


const handleClickOutside = (event) => {
    if (dropdownSortOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        dropdownSortOpen.value = false;
    }
};


onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>