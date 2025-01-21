<template>
  <div
    class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0">
    <div v-if="isVisible" class="tw-component-container popup-overlay" @click="hide">
      <div class="popup-content" @click.stop>
        <form @submit.prevent="sendMeetingRequest">
          <button @click="hide" class="popup-close-btn" id="closeBtn">X</button>
          <div>
            <h1 class="popup-title">Send a Meeting Suggestion to {{ props.request.user.data.username }}?</h1>
          </div>
          <div class="w-full mb-2">
            <label for="location" class="tw-input-label">
              Location
            </label>
            <div class="relative">
              <input
                class="tw-input pl-4 h-10"
                v-bind:class="{ 'tw-input-error': isControlInvalid('location') }"
                v-model="meetingForm.location"
                id="location"
                type="text"
                :placeholder="'Enter location'"
                @blur="handleBlur('location')"
              />
              <div class="relative">
                <div :class="{
                  'opacity-100 visible': isControlInvalid('location'),
                  'opacity-0 invisible': !isControlInvalid('location'),
                }" class="tw-input-error-label">
                  <div v-if="errors.location.required">
                    This field is required
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="input-field mt-4">
            <div class="w-full mb-2">
              <label for="date" class="tw-input-label">
                Date
              </label>
              <input
                id="date"
                type="date"
                class="tw-input pl-4 h-10 cursor-pointer"
                v-model="meetingForm.date"
              />
            </div>
          </div>
          <div class="input-field mt-4">
            <div class="w-full mb-2">
              <label for="deadline" class="tw-input-label">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                class="tw-input pl-4 h-10 cursor-pointer"
                v-model="meetingForm.deadline"
              />
            </div>
          </div>
          <div class="flex justify-center space-x-4 mt-4">
            <button @click="hide" class="btn-primary btn-gray rounded-2xl" id="cancelBtn">Cancel</button>
            <button
              :disabled="isLoading"
              class="btn-primary btn-green rounded-2xl"
              type="submit"
            >
              <div class="flex items-center justify-center">
                <div v-if="isLoading" class="tw-loading-animation mr-2"></div>
                <div>Send Meeting Request</div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { lendingService } from '@/services/LendingService.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';

const isVisible = ref(false);
const isLoading = ref(false);
const meetingForm = reactive({
  location: '',
  date: '',
  deadline: '',
});
const props = defineProps({
  request: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['refreshIncomingRequests', 'refreshOutgoingRequests']);

const initializeDates = () => {
  const today = new Date().toISOString().split('T')[0];
  meetingForm.date = today;
  meetingForm.deadline = today;
};

const errors = reactive({
  location: { required: false, touched: false },
});

const isControlInvalid = (field) => {
  const value = meetingForm[field];
  const isEmpty = !value || value.trim() === '';
  errors[field].required = isEmpty;
  return isEmpty && errors[field].touched;
};

const handleBlur = (field) => {
  errors[field].touched = true;
  isControlInvalid(field);
};

const validateForm = () => {
  const fields = ['location'];

  fields.forEach((field) => {
    errors[field].touched = true;
    isControlInvalid(field);
  });

  return fields.every((field) => !errors[field].required);
};

const show = () => {
  isVisible.value = true;
  initializeDates();
};

const hide = () => {
  meetingForm.location = '';
  isVisible.value = false;
};

const sendMeetingRequest = async () => {
  if (!validateForm()) return;
  isLoading.value = true;

  try {
    const formatToInstant = (date) => `${date}T00:00:00Z`;
    const payload = {
      meetingLocation: meetingForm.location,
      meetingTime: formatToInstant(meetingForm.date),
      deadline: formatToInstant(meetingForm.deadline),
    };

    console.log('Creating lending meeting with payload', payload);

    await lendingService.createLendingMeeting(props.request.lending.id, payload);

    Snackbar.showSnackbar('Successfully proposed meeting!', SnackbarType.SUCCESS);
    emit('refreshIncomingRequests');
    emit('refreshOutgoingRequests');
    hide();
  } catch (e) {
    const type = e.response?.data?.type;

    switch (type) {
      case 'IllegalMeetingException':
        Snackbar.showSnackbar(e.response?.data?.message, SnackbarType.ERROR);
        break;
      default:
        Snackbar.showSnackbar('Unexpected error occured, check console', SnackbarType.ERROR);
        console.log('Error', e);
    }
  } finally {
    isLoading.value = false;
  }
};

defineExpose({
  show,
  hide,
});
</script>
