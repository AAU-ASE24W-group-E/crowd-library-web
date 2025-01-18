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

    <form
      @submit.prevent="updatePassword"
      class="flex flex-col items-center w-full h-full mb-3"
    >
      <!-- Old Password -->
      <div class="w-full mb-6">
        <label for="old-password" class="tw-input-label">Old Password</label>
        <div class="relative">
          <input
            class="tw-input"
            v-bind:class="{ 'tw-input-error': isControlInvalid('oldPassword') }"
            v-model="updateForm.oldPassword"
            id="old-password"
            :type="hideOldPassword ? 'password' : 'text'"
            autocomplete="current-password"
            placeholder="Old Password"
            @blur="handleBlur('oldPassword')"
          />
          <button
            type="button"
            @click="toggleOldPasswordVisibility"
            class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500"
          >
            <font-awesome-icon :icon="hideOldPassword ? 'eye-slash' : 'eye'" />
          </button>
          <div v-if="isControlInvalid('oldPassword')" class="tw-input-error-label">
            <div v-if="errors.oldPassword.required">This field is required</div>
          </div>
        </div>
      </div>

      <!-- New Password -->
      <div class="w-full mb-6">
        <label for="new-password" class="tw-input-label">New Password</label>
        <div class="relative">
          <input
            class="tw-input"
            v-bind:class="{ 'tw-input-error': isControlInvalid('newPassword') }"
            v-model="updateForm.newPassword"
            id="new-password"
            :type="hideNewPassword ? 'password' : 'text'"
            autocomplete="new-password"
            placeholder="New Password"
            @blur="handleBlur('newPassword')"
          />
          <button
            type="button"
            @click="toggleNewPasswordVisibility"
            class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500"
          >
            <font-awesome-icon :icon="hideNewPassword ? 'eye-slash' : 'eye'" />
          </button>
          <div v-if="isControlInvalid('newPassword')" class="tw-input-error-label">
            <div v-if="errors.newPassword.required">This field is required</div>
          </div>
        </div>
      </div>

      <!-- Confirm New Password -->
      <div class="w-full mb-6">
        <label for="confirm-password" class="tw-input-label">Confirm New Password</label>
        <div class="relative">
          <input
            class="tw-input"
            v-bind:class="{ 'tw-input-error': isControlInvalid('confirmPassword') }"
            v-model="updateForm.confirmPassword"
            id="confirm-password"
            :type="hideConfirmPassword ? 'password' : 'text'"
            autocomplete="new-password"
            placeholder="Confirm New Password"
            @blur="handleBlur('confirmPassword')"
          />
          <button
            type="button"
            @click="toggleConfirmPasswordVisibility"
            class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500"
          >
            <font-awesome-icon :icon="hideConfirmPassword ? 'eye-slash' : 'eye'" />
          </button>
          <div v-if="isControlInvalid('confirmPassword')" class="tw-input-error-label">
            <div v-if="errors.confirmPassword.required">This field is required</div>
            <div v-if="errors.confirmPassword.mismatch">Passwords do not match</div>
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

library.add(faEye, faEyeSlash);

const router = useRouter();
const userStore = useUserStore();

const updateForm = reactive({
  email: '',
  username: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const errors = reactive({
  email: { required: false, touched: false },
  username: { required: false, touched: false },
  oldPassword: { required: false, touched: false },
  newPassword: { required: false, touched: false },
  confirmPassword: { required: false, touched: false, mismatch: false },
});

const hideOldPassword = ref(true);
const hideNewPassword = ref(true);
const hideConfirmPassword = ref(true);
const isLoading = ref(false);

const isAnyPasswordFieldFilled = () => {
  return (
    updateForm.oldPassword.trim() !== '' ||
    updateForm.newPassword.trim() !== '' ||
    updateForm.confirmPassword.trim() !== ''
  );
};

watchEffect(() => {
  if (userStore.user) {
    updateForm.email = userStore.user.email || '';
    updateForm.username = userStore.user.username || '';
  }
});

const isControlInvalid = (field) => {
  if (!isAnyPasswordFieldFilled()) {
    errors[field].required = false;
    if (field === 'confirmPassword') {
      errors.confirmPassword.mismatch = false;
    }
    return false;
  }

  const value = updateForm[field];
  const isEmpty = !value || value.trim() === '';
  errors[field].required = isEmpty;

  if (field === 'confirmPassword') {
    errors.confirmPassword.mismatch =
      updateForm.newPassword !== updateForm.confirmPassword;
  }

  return errors[field].required || errors[field].mismatch;
};

const handleBlur = (field) => {
  errors[field].touched = true;
  isControlInvalid(field);
};

const toggleOldPasswordVisibility = () => {
  hideOldPassword.value = !hideOldPassword.value;
};

const toggleNewPasswordVisibility = () => {
  hideNewPassword.value = !hideNewPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  hideConfirmPassword.value = !hideConfirmPassword.value;
};

const validatePasswordForm = () => {
  ['oldPassword', 'newPassword', 'confirmPassword'].forEach((field) => {
    errors[field].touched = true;
    isControlInvalid(field);
  });

  return (
    !errors.oldPassword.required &&
    !errors.newPassword.required &&
    !errors.confirmPassword.required &&
    !errors.confirmPassword.mismatch
  );
};

const updateUserInfo = async () => {
  if (isLoading.value) return;

  const fieldsToValidate = ['email', 'username'];
  fieldsToValidate.forEach((field) => {
    errors[field].touched = true;
    isControlInvalid(field);
  });

  if (fieldsToValidate.some((field) => errors[field].required)) return;

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
  if (!validatePasswordForm()) return;

  isLoading.value = true;

  try {
    await authenticationService.updatePassword({
      oldPassword: updateForm.oldPassword,
      newPassword: updateForm.newPassword,
    });
    Snackbar.showSnackbar('Password updated successfully!', SnackbarType.SUCCESS);
  } catch (e) {
    Snackbar.showSnackbar('Failed to update password. Please try again.', SnackbarType.ERROR);
  } finally {
    isLoading.value = false;
  }
};
</script>

