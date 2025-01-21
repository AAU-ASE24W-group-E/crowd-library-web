<template>
  <div @click="toggleDropdown"
    class="tw-component-container w-full bg-white dark:bg-dark-mode-inside shadow-md rounded-lg border border-gray-200 dark:border-gray-600 transition duration-500 ease-in-out hover:scale-101 animate-fade-in relative cursor-pointer">
    <div class="flex flex-row w-full">
      <img
        :src="`${config.OPENLIBRARY_COVER_URL}${book.coverId}.jpg`"
        alt="Cover"
        class="object-contain decoration-0 mr-3 w-[80px] max-sm:hidden"
      />
      <div class="flex flex-col flex-grow">
        <span class="text-xl font-semibold dark:text-title-dark-mode-text">Request by {{user.username}}: {{ book.title }}</span>
        <div class="flex flex-row max-sm:flex-col max-sm:mt-2 sm:space-x-8 max-sm:space-y-2">
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">Publisher: <span class="tw-book-entry-info-value">{{ book.publisher }}</span></span>
            <span class="tw-book-entry-info-title">Format: <span class="tw-book-entry-info-value">{{ book.format }}</span></span>
            <span class="tw-book-entry-info-title">Language: <span class="tw-book-entry-info-value">
                {{ book.languages && book.languages.length > 0 ? `${book.languages[0].toUpperCase()}` : 'No language found' }}</span></span>
          </div>
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">ISBN: <span class="tw-book-entry-info-value">{{ book.isbn }}</span></span>
            <span class="tw-book-entry-info-title">Meeting Date: <span class="tw-book-entry-info-value">{{ lending.lendingMeeting?.meetingTime ? formatDate(lending.lendingMeeting.meetingTime) : 'No meeting' }}</span></span>
            <span class="tw-book-entry-info-title">Location: <span class="tw-book-entry-info-value">{{ lending.lendingMeeting?.meetingLocation || 'No meeting' }}</span></span>
          </div>
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">Due date: <span class="tw-book-entry-info-value">{{ lending.lendingMeeting?.deadline ? formatDate(lending.lendingMeeting.deadline) : 'No deadline set' }}</span></span>
            <span class="tw-book-entry-info-title">Lending status: <span class="tw-book-entry-info-value">{{ lending.status }}</span></span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center ml-2">
        <font-awesome-icon :icon="faChevronRight" class="tw-icon"
          :class="{ 'rotate-90': dropdownOpen }"></font-awesome-icon>
      </div>
    </div>
    <div v-bind:class="{
      'max-h-0 overflow-hidden': !dropdownOpen,
      'max-h-40 overflow-hidden': dropdownOpen,
    }" class="transition-all duration-300 ease-in-out w-full">
      <div
        class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0">
        <button v-if="!incoming" @click="cancelOutgoingLending" v-show="dropdownOpen" id="withdrawBtn" class="btn-primary btn-gray rounded-2xl">Withdraw</button>
        <button v-if="incoming" @click="declineIncomingLending" v-show="dropdownOpen" id="declineBtn" class="btn-primary btn-gray rounded-2xl">Decline</button>
        <button v-if="incoming && lending.status === LendingStatus.READER_CREATED_REQUEST" @click="openPopup" v-show="dropdownOpen" id="suggestMeetingBtn" class="btn-primary btn-green rounded-2xl">Suggest Meeting</button>
        <button v-if="!incoming && lending.status === LendingStatus.OWNER_SUGGESTED_MEETING" @click="confirmMeeting" v-show="dropdownOpen" id="suggestMeetingBtn" class="btn-primary btn-green rounded-2xl">Confirm Meeting</button>
        <button v-if="incoming && lending.status === LendingStatus.READER_ACCEPTED_MEETING" @click="confirmTransferOwner" v-show="dropdownOpen" id="suggestMeetingBtn" class="btn-primary btn-green rounded-2xl">Confirm Transfer</button>
        <button v-if="!incoming && lending.status === LendingStatus.OWNER_CONFIRMED_TRANSFER" @click="confirmTransferReader" v-show="dropdownOpen" id="suggestMeetingBtn" class="btn-primary btn-green rounded-2xl">Confirm Transfer</button>
      </div>
    </div>
  </div>
  <MeetingPopup ref="meetingPopup"
                :request="request"
                @refreshIncomingRequests="$emit('refreshIncomingRequests')"
                @refreshOutgoingRequests="$emit('refreshOutgoingRequests')"
  />
</template>

<script setup>
import { defineProps, ref, toRaw } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MeetingPopup from './MeetingPopup.vue';
import config from '@/config.json';
import { lendingService } from '@/services/LendingService.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { LendingStatus } from '@/enums/lendingStatus.ts';

const meetingPopup = ref(null);

const props = defineProps({
  incoming: {
    type: Boolean,
    required: true,
  },
  request: {
    type: Object,
    required: true,
  }
});


const emit = defineEmits(['refreshIncomingRequests', 'refreshOutgoingRequests']);
const lending = props.request.lending;
const user = props.request.user.data;
const book = props.request.book.data;
const dropdownOpen = ref(false);

/*console.log(toRaw(lending));
console.log(toRaw(user));
console.log(toRaw(book));*/

const formatDate = (isoDate) => {
  if (!isoDate) return 'No date available';
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

const declineIncomingLending = async () => {
  try {
    await lendingService.declineLendingRequest(lending.id);
    Snackbar.showSnackbar('Lending successfully declined!', SnackbarType.SUCCESS);
    emit('refreshIncomingRequests');
  } catch (error) {
    console.error("Error declining request: ", error);
    Snackbar.showSnackbar('There was an error declining lending request. Check console', SnackbarType.ERROR);
  }
}

const cancelOutgoingLending = async () => {
  try {
    await lendingService.cancelLendingRequest(lending.id);
    Snackbar.showSnackbar('Lending successfully cancelled!', SnackbarType.SUCCESS);
    emit('refreshOutgoingRequests');
  } catch (error) {
    console.error("Error cancelling request: ", error);
    Snackbar.showSnackbar('There was an error cancelling lending request. Check console', SnackbarType.ERROR);
  }
}

const confirmMeeting = async () => {
  try {
    await lendingService.updateLendingStatus(lending.id, LendingStatus.READER_ACCEPTED_MEETING);
    Snackbar.showSnackbar('Lending successfully accepted!', SnackbarType.SUCCESS);
    emit('refreshOutgoingRequests');
    emit('refreshIncomingRequests');
  } catch (error) {
    console.error("Error accepting meeting: ", error);
    Snackbar.showSnackbar('There was an error accepting meeting. Check console', SnackbarType.ERROR);
  }
}

const confirmTransferOwner = async () => {
  try {
    await lendingService.updateLendingStatus(lending.id, LendingStatus.OWNER_CONFIRMED_TRANSFER);
    Snackbar.showSnackbar('Book transfer successfully confirmed by owner!', SnackbarType.SUCCESS);
    emit('refreshOutgoingRequests');
    emit('refreshIncomingRequests');
  } catch (error) {
    console.error("Error confirming book transfer (owner): ", error);
    Snackbar.showSnackbar('There was an error, check console', SnackbarType.ERROR);
  }
}

const confirmTransferReader = async () => {
  try {
    await lendingService.updateLendingStatus(lending.id, LendingStatus.READER_CONFIRMED_TRANSFER);
    Snackbar.showSnackbar('Book was successfully borrowed - Keep an eye on your deadline!', SnackbarType.SUCCESS);
    emit('refreshOutgoingRequests');
    emit('refreshIncomingRequests');
  } catch (error) {
    console.error("Error confirming book transfer (reader): ", error);
    Snackbar.showSnackbar('There was an error borrowing the book, check console', SnackbarType.ERROR);
  }
}


function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

// Function to open the popup
const openPopup = () => {
  meetingPopup.value.show();
};
</script>
