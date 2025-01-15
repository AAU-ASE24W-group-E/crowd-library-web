<template>
  <div class="tw-component-container">
    <!-- Form for changing username or email -->
    <form
      @submit.prevent="updateUserInfo"
      class="flex flex-col items-center w-full h-full mb-3"
    >
      <div class="w-full mb-6">
        <label for="email" class="tw-input-label">Email</label>
        <div class="relative">
          <input
            class="tw-input"
            v-bind:class="{ 'tw-input-error': isControlInvalid('email') }"
            v-model="updateForm.email"
            id="email"
            autocomplete="email"
            type="email"
            placeholder="Email"
            @blur="handleBlur('email')"
          />
          <div v-if="isControlInvalid('email')" class="tw-input-error-label">
            <div v-if="errors.email.required">This field is required</div>
          </div>
        </div>
      </div>

      <div class="w-full mb-6">
        <label for="username" class="tw-input-label">Username</label>
        <div class="relative">
          <input
            class="tw-input"
            v-bind:class="{ 'tw-input-error': isControlInvalid('username') }"
            v-model="updateForm.username"
            id="username"
            autocomplete="username"
            type="text"
            placeholder="Username"
            @blur="handleBlur('username')"
          />
          <div v-if="isControlInvalid('username')" class="tw-input-error-label">
            <div v-if="errors.username.required">This field is required</div>
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
            <div>Update Info</div>
          </div>
        </button>
      </div>
    </form>

    <!-- Form for changing password -->
    <form
      @submit.prevent="updatePassword"
      class="flex flex-col items-center w-full h-full mb-3"
    >
      <div class="w-full mb-6">
        <label for="password" class="tw-input-label">New Password</label>
        <div class="relative">
          <input
            class="tw-input"
            v-bind:class="{ 'tw-input-error': isControlInvalid('password') }"
            v-model="updateForm.password"
            id="password"
            :type="hidePassword ? 'password' : 'text'"
            autocomplete="new-password"
            placeholder="New Password"
            @blur="handleBlur('password')"
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500"
          >
            <font-awesome-icon :icon="hidePassword ? 'eye-slash' : 'eye'" />
          </button>
          <div v-if="isControlInvalid('password')" class="tw-input-error-label">
            <div v-if="errors.password.required">This field is required</div>
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
            <div>Change Password</div>
          </div>
        </button>
      </div>
    </form>
  </div>

</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { authenticationService } from '@/services/AuthenticationService.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import LocationSettingView from '@/views/LocationSettingView.vue'
import LocationSetting from '@/components/LocationSetting.vue'

library.add(faEye, faEyeSlash);

const router = useRouter();
const userStore = useUserStore();

const updateForm = reactive({
  email: '',
  username: '',
  password: '',
});

const errors = reactive({
  email: { required: false, touched: false },
  username: { required: false, touched: false },
  password: { required: false, touched: false },
});

const hidePassword = ref(true);
const isLoading = ref(false);

// Load user data from the store, excluding password
watchEffect(() => {
  if (userStore.user) {
    updateForm.email = userStore.user.email || '';
    updateForm.username = userStore.user.username || '';
  }
});

const isControlInvalid = (field) => {
  const value = updateForm[field];
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

const validateForm = (fields) => {
  fields.forEach((field) => {
    errors[field].touched = true;
    isControlInvalid(field);
  });

  return fields.every((field) => !errors[field].required);
};

const updateUserInfo = async () => {
  if (isLoading.value) return;
  if (!validateForm(['email', 'username'])) return;

  isLoading.value = true;

  try {
    const email = updateForm.email.trim().toLowerCase();
    const username = updateForm.username.trim().toLowerCase();

    await authenticationService.updateUserInfo({ email, username });
    Snackbar.showSnackbar('User info updated successfully!', SnackbarType.SUCCESS);
    userStore.setUser({ ...userStore.user, email, username });
  } catch (e) {
    Snackbar.showSnackbar('Failed to update user info. Please try again.', SnackbarType.ERROR);
  } finally {
    isLoading.value = false;
  }
};

const updatePassword = async () => {
  if (isLoading.value) return;
  if (!validateForm(['password'])) return;

  isLoading.value = true;

  try {
    await authenticationService.updatePassword({ password: updateForm.password });
    Snackbar.showSnackbar('Password updated successfully!', SnackbarType.SUCCESS);
  } catch (e) {
    Snackbar.showSnackbar('Failed to update password. Please try again.', SnackbarType.ERROR);
  } finally {
    isLoading.value = false;
  }
};
</script>
