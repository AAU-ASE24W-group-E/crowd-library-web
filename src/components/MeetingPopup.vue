<template>
    <div
        class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0">
        <div v-if="isVisible" class="tw-component-container popup-overlay" @click="hide">
            <div class="popup-content" @click.stop>
                <button @click="hide" class="popup-close-btn">X</button>
                <div class="modal-header">
                    <h2 class="title">Send a Meeting Suggestion to {{ request.from }}</h2>
                </div>
                <div class="input-field mt-4">
                    <label for="place" class="block text-sm font-medium">Place</label>
                    <input id="place" type="text" placeholder="Enter place"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div class="flex space-x-8 mt-4">
                    <button @click="hide" class="btn-primary btn-gray rounded-2xl">Cancel</button>
                    <button @click="hide" class="btn-primary btn-green rounded-2xl">Send Meeting Request</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(false);

const props = defineProps({
    request: {
        type: Object,
        required: true,
    }
});

// Function to show the popup
const show = () => {
    isVisible.value = true;
};

// Function to hide the popup
const hide = () => {
    isVisible.value = false;
};

defineExpose({
    show,
    hide
});
</script>