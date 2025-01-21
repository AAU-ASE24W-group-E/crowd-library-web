<template>
    <div
        class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0">
        <div v-if="isVisible" class="tw-component-container popup-overlay" @click="hide">
            <div class="popup-content" @click.stop>
                <button @click="hide" class="popup-close-btn" id="closeBtn">X</button>
              <div class="flex items-center flex-col space-y-3">
                <h1 class="popup-title">Send a request to {{ book.owner.username || 'the owner' }}?</h1>
                <span class="dark:text-dark-mode-text">Are you sure that you want to send a request to get this book?</span>
              </div>
<!--                <div class="input-field mt-4">
                    <label for="request-purpose" class="popup-label">I want to request this book for ...</label>
                    <select
                        id="request-purpose"
                        class="popup-input">
                        <option v-if="book.isLendable" value="lending">Lending</option>
                        <option v-if="book.isExchangeable" value="exchanging">Exchanging</option>
                        <option v-if="book.isGiftable" value="gifting">Gifting</option>
                    </select>
                </div>-->
                <div class="flex justify-center space-x-4 mt-4">
                    <button @click="hide" class="btn-primary btn-gray rounded-2xl" id="cancelBtn">Cancel</button>
                    <button @click="requestBook" class="btn-primary btn-green rounded-2xl" id="requestBookBtn">Request Book</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { lendingService } from '@/services/LendingService.ts';
import { LendingStatus } from '@/enums/lendingStatus.ts';
import { useUserStore } from '@/stores/user.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';

const isVisible = ref(false);
const userStore = useUserStore();

const props = defineProps({
    book: {
        type: Object,
        required: true,
    }
});

const show = () => {
    isVisible.value = true;
};

const hide = () => {
    isVisible.value = false;
};

// TODO prevent that same person can create same lending request again
const requestBook = async () => {
  try {
    const payload = {
      bookId: props.book.book.id,
      readerId: userStore.user.id,
      ownerId: props.book.owner.id,
      status: LendingStatus.READER_CREATED_REQUEST
    }
    console.debug("Trying to create lending request with following payload: ", payload);
    await lendingService.createLending(payload);
    Snackbar.showSnackbar('Lending Request successfully created!', SnackbarType.SUCCESS);
  } catch(e) {
    const type = e.response?.data?.type;
    switch (type) {
      case 'InvalidOwnerReaderException':
        Snackbar.showSnackbar('Owner cannot create lending request for their own book', SnackbarType.ERROR);
        break;
      case 'LendingRequestExistsException':
        Snackbar.showSnackbar('A lending request of this book already exists. Close or finish your old one', SnackbarType.ERROR);
        break;
      default:
        console.error("Error creating lending request", e);
        Snackbar.showSnackbar('Unexpected error while creating lending request. Check console.', SnackbarType.ERROR);
    }
  }

  hide();
}

defineExpose({
    show,
    hide
});
</script>
