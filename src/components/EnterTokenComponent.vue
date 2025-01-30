<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700"
    >
      <div class="tw-heading mb-5 mt-2">Reset Password</div>
      <form
        @submit.prevent="resetPassword"
        class="flex flex-col items-center w-full h-full mb-3"
      >
        <!-- Token Input -->
        <div class="w-full mb-6">
          <label for="token" class="tw-input-label">Token</label>
          <div class="relative">
            <input
              class="tw-input"
              :class="{ 'tw-input-error': isControlInvalid('token') }"
              v-model="resetForm.token"
              id="token"
              type="text"
              placeholder="Enter your reset token"
              @blur="handleBlur('token')"
            />
            <div
              :class="{
                'opacity-100 visible': isControlInvalid('token'),
                'opacity-0 invisible': !isControlInvalid('token'),
              }"
              class="tw-input-error-label"
            >
              <div v-if="errors.token.required">This field is required</div>
            </div>
          </div>
        </div>

        <!-- Password Input -->
        <div class="w-full mb-6">
          <label for="password" class="tw-input-label">New Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300" :icon="faLock" />
            </div>
            <input
              class="tw-input"
              :class="{ 'tw-input-error': isControlInvalid('password') }"
              v-model="resetForm.password"
              id="password"
              :type="hidePassword ? 'password' : 'text'"
              placeholder="Enter your new password"
              @blur="handleBlur('password')"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400"
            >
              <font-awesome-icon
                class="tw-icon text-gray-500 dark:text-gray-300"
                :icon="hidePassword ? 'eye-slash' : 'eye'"
                title="Toggle password visibility"
              />
            </button>
            <div
              :class="{
                'opacity-100 visible': isControlInvalid('password'),
                'opacity-0 invisible': !isControlInvalid('password'),
              }"
              class="tw-input-error-label"
            >
              <div v-if="errors.password.required">This field is required</div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="w-full mb-2">
          <button
            :disabled="isLoading"
            class="w-full btn-primary btn-blue"
            type="submit"
          >
            <div class="flex items-center justify-center">
              <div v-if="isLoading" class="tw-loading-animation mr-2"></div>
              <div>Reset Password</div>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { authenticationService } from '@/services/AuthenticationService.ts';

library.add(faLock, faEye, faEyeSlash);

const resetForm = reactive({
  token: '',
  password: '',
});

const errors = reactive({
  token: { required: false, touched: false },
  password: { required: false, touched: false },
});

const isLoading = ref(false);
const hidePassword = ref(true);
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

const togglePasswordVisibility = () => {
  hidePassword.value = !hidePassword.value;
};

const validateForm = () => {
  const fields = ['token', 'password'];
  fields.forEach((field) => {
    errors[field].touched = true;
    isControlInvalid(field);
  });
  return fields.every((field) => !errors[field].required);
};

const resetPassword = async () => {
  if (isLoading.value) return;
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await authenticationService.resetPassword(resetForm.token, resetForm.password);
    Snackbar.showSnackbar('Password successfully reset!', SnackbarType.SUCCESS);
    router.push('/login');
  } catch (e) {
    console.error('Error resetting password:', e);
    Snackbar.showSnackbar('Failed to reset password. Please try again.', SnackbarType.ERROR);
  } finally {
    isLoading.value = false;
  }
};
</script>
