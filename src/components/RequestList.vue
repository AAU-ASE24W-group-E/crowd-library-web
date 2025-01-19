<template>
    <div class="tw-component-container px-0 w-full" ref="dropdownRef">
        <div class="space-y-6 w-full mt-4">
            <RequestEntry v-for="(request, index) in requests" :key="index" :request="request" :incoming="incoming"/>
        </div>
    </div>
</template>

<script setup>
import RequestEntry from '@/components/RequestEntry.vue';
import { defineProps, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  requests: Array,
  incoming: Boolean,
});

// Example array of book requests
const requests = ref(props.requests);
const incoming = ref(props.incoming);

let dropdownSortOpen = ref(false);
const dropdownRef = ref(null);

const handleClickOutside = (event) => {
    if (dropdownSortOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        dropdownSortOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    console.log("Incoming: " + incoming.value);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>