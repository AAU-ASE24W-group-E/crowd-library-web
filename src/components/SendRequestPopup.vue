<template>
    <div
        class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0">
        <div v-if="isVisible" class="tw-component-container popup-overlay" @click="hide">
            <div class="popup-content" @click.stop>
                <button @click="hide" class="popup-close-btn">X</button>
                <div>
                    <h1 class="title text-center text-2xl text-gray-500">Send a Request to {{ book.owner }}</h1>
                </div>
                <div class="input-field mt-4">
                    <label for="request-purpose" class="block text-sm font-medium">I want to request this book for ...</label>
                    <select
                        id="request-purpose"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option v-if="book.isLendable" value="lending">Lending</option>
                        <option v-if="book.isExchangeable" value="exchanging">Exchanging</option>
                        <option v-if="book.isGiftable" value="gifting">Gifting</option>
                    </select>
                </div>
                <div class="flex justify-center space-x-4 mt-4">
                    <button @click="hide" class="btn-primary btn-gray rounded-2xl">Cancel</button>
                    <button @click="hide" class="btn-primary btn-green rounded-2xl">Request Book</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(false);

const props = defineProps({
    book: {
        type: Object,
        required: true,
    }
});

// Function to show the popup
const show = () => {
    isVisible.value = true;
    console.log("Popup show called");
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