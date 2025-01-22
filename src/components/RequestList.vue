<template>
  <div class="tw-component-container px-0 w-full" ref="dropdownRef">
    <div class="space-y-6 w-full mt-4">
      <RequestEntry v-for="request in requests"
                    :key="request.lending.id"
                    :incoming="incoming"
                    :request="request"
                    @refreshIncomingRequests="refreshIncomingRequests"
                    @refreshOutgoingRequests="refreshOutgoingRequests"

      />
    </div>
  </div>
</template>

<script setup>
import RequestEntry from '@/components/RequestEntry.vue';
import { defineProps, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  requests: {
    type: Array,
    required: true,
  },
  incoming: {
    type: Boolean,
    required: true,
  },
});

let dropdownSortOpen = ref(false);
const dropdownRef = ref(null);

const emit = defineEmits(['refreshIncomingRequests', 'refreshOutgoingRequests']);

const refreshIncomingRequests = () => {
  emit('refreshIncomingRequests');
};

const refreshOutgoingRequests = () => {
  emit('refreshOutgoingRequests');
};

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
