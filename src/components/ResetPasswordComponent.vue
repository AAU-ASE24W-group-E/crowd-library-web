<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700"
    >
      <div class="tw-heading mb-5 mt-2">Reset Password</div>
      <form
        @submit.prevent="requestPasswordReset"
        class="flex flex-col items-center w-full h-full mb-3"
      >
        <div class="w-full mb-6">
          <label for="email" class="tw-input-label">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300" :icon="faEnvelope" />
            </div>
            <input
              class="tw-input"
              v-bind:class="{ 'tw-input-error': isControlInvalid('email') }"
              v-model="resetForm.email"
              id="email"
              autocomplete="email"
              type="text"
              :placeholder="'Enter your email'"
              @blur="handleBlur('email')"
            />
            <div class="relative">
              <div
                :class="{
                  'opacity-100 visible': isControlInvalid('email'),
                  'opacity-0 invisible': !isControlInvalid('email'),
                }"
                class="tw-input-error-label"
              >
                <div v-if="errors.email.required">This field is required</div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mb-2">
          <button
            :disabled="isLoading"
            class="w-full btn-primary btn-blue"
            type="submit"
          >
            <div class="flex items-center justify-center">
              <div v-if="isLoading" class="tw-loading-animation mr-2"></div>
              <div>Send Reset Link</div>
            </div>
          </button>
        </div>

        <span class="text-hint-style mt-2">
          Enter your email, and we'll send you a link to reset your password.
        </span>
        <router-link class="text-link-style mt-4" to="/login">
          Back to Login
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { authenticationService } from '@/services/AuthenticationService.ts';

library.add(faEnvelope);

const resetForm = reactive({
  email: '',
});

const errors = reactive({
  email: { required: false, touched: false },
});

const isLoading = ref(false);
const router = useRouter();

const isControlInvalid = (field) => {
  const value = resetForm[field];
  const isEmpty = !value || value.trim() === '';
  errors[field].required = isEmpty;
  return isEmpty && errors[field].touched;
};

const handleBlur = (field) => {
  errors[field].touched = true;
  isControlInvalid(field);
};

const validateForm = () => {
  const fields = ['email'];
  fields.forEach((field) => {
    errors[field].touched = true;
    isControlInvalid(field);
  });
  return fields.every((field) => !errors[field].required);
};

const requestPasswordReset = async () => {
  if (isLoading.value) return;
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await authenticationService.requestReset(resetForm.email);
    Snackbar.showSnackbar('Password reset link sent!', SnackbarType.SUCCESS);
    router.push('/enter-token');
  } catch (e) {
    console.error('Error requesting password reset:', e);
    Snackbar.showSnackbar('Failed to send password reset link. Please try again.', SnackbarType.ERROR);
  } finally {
    isLoading.value = false;
  }
};
</script>
