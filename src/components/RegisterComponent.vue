<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700">
      <div class="tw-heading mb-5 mt-2">Register</div>

      <form
        @submit.prevent="register"
        class="flex flex-col items-center w-full h-full mb-3">
        <div class="w-full mb-6">
          <label for="email" class="tw-input-label">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon
                class="tw-icon text-gray-500 dark:text-gray-300"
                :icon="faEnvelope"
              />
            </div>
            <input
              class="tw-input"
              v-bind:class="{ 'tw-input-error': isControlInvalid('email') }"
              v-model="registerForm.email"
              id="email"
              autocomplete="email"
              type="text"
              :placeholder="'Enter email'"
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
                <div v-else-if="errors.email.invalid">Please enter a valid email address</div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mb-6">
          <label for="username" class="tw-input-label">Username</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon
                class="tw-icon text-gray-500 dark:text-gray-300"
                :icon="faUser"
              />
            </div>
            <input
              class="tw-input"
              v-bind:class="{ 'tw-input-error': isControlInvalid('username') }"
              v-model="registerForm.username"
              id="username"
              autocomplete="username"
              type="text"
              :placeholder="'Enter username'"
              @blur="handleBlur('username')"
            />
            <div class="relative">
              <div
                :class="{
                  'opacity-100 visible': isControlInvalid('username'),
                  'opacity-0 invisible': !isControlInvalid('username'),
                }"
                class="tw-input-error-label"
              >
                <div v-if="errors.username.required">This field is required</div>
                <div v-else-if="errors.username.invalid">Username can only contain letters and numbers</div>
                <div v-else-if="errors.username.maxLength">Username can be max. {{ config.USERNAME_MAX_LENGTH }}
                  characters
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mb-6">
          <label for="password" class="tw-input-label">
            Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300" :icon="faLock"/>
            </div>
            <input
              class="tw-input"
              id="password"
              v-bind:class="{ 'tw-input-error': isControlInvalid('password') }"
              :type="hidePassword ? 'password' : 'text'"
              v-model="registerForm.password"
              autocomplete="current-password"
              :placeholder="'******'"
              @blur="handleBlur('password')"
            />
            <button
              type="button"
              id="toggle-password-visibility"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400"
            >
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300"
                                 :icon="hidePassword ? 'eye-slash' : 'eye'" :title="'Toggle password visibility'"/>
            </button>
            <div class="relative">
              <div :class="{
                  'opacity-100 visible': isControlInvalid('password'),
                  'opacity-0 invisible': !isControlInvalid('password'),
                }"
                   class="tw-input-error-label">
                <div v-if="errors.password.required">This field is required</div>
                <div v-else-if="errors.password.minLength">Password must be at least {{ config.PASSWORD_MIN_LENGTH }}
                  characters long
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mb-10">
          <label for="confirm-password" class="tw-input-label">
            Confirm Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300" :icon="faLock"/>
            </div>
            <input
              class="tw-input"
              id="confirm-password"
              v-bind:class="{ 'tw-input-error': isControlInvalid('confirmPassword') }"
              :type="hideConfirmPassword ? 'password' : 'text'"
              v-model="registerForm.confirmPassword"
              autocomplete="current-password"
              :placeholder="'******'"
              @blur="handleBlur('confirmPassword')"
            />
            <button
              type="button"
              id="toggle-confirm-password-visibility"
              @click="toggleConfirmPasswordVisibility"
              class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400"
            >
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300"
                                 :icon="hideConfirmPassword ? 'eye-slash' : 'eye'"
                                 :title="'Toggle password visibility'"/>
            </button>
            <div class="relative">
              <div :class="{
                  'opacity-100 visible': isControlInvalid('confirmPassword'),
                  'opacity-0 invisible': !isControlInvalid('confirmPassword'),
                }"
                   class="tw-input-error-label">
                <div v-if="errors.confirmPassword.required">This field is required</div>
                <div v-else-if="errors.confirmPassword.notMatch">Passwords do not match</div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mb-2">
          <button
            :disabled="isLoading"
            class="w-full btn-primary btn-blue"
            type="submit">
            <div class="flex items-center justify-center">
              <div v-if="isLoading" class="tw-loading-animation"></div>
              <div class="ml-2">Register</div>
            </div>
          </button>
        </div>

        <span class="text-hint-style">When registering, you accept the Terms of Use and acknowledge the Privacy Statement and Cookie Policy.</span>
        <span class="text-hint-style text-base mt-2">Already have an account?</span>
        <router-link class="text-link-style" to="/login">
          Sign in
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faEnvelope, faEye, faEyeSlash, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {reactive, ref} from 'vue'
import config from "@/config.json";
import {useRouter} from 'vue-router'
import apiClient from "../../api.js";

library.add(faEye, faEyeSlash)

const router = useRouter()
const hidePassword = ref(true)
const hideConfirmPassword = ref(true)
const isLoading = ref(false)


const registerForm = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  email: {required: false, invalid: false, touched: false},
  username: {required: false, maxLength: false, invalid: false, touched: false},
  password: {required: false, minLength: false, touched: false},
  confirmPassword: {required: false, notMatch: false, touched: false},
});

const handleBlur = (field) => {
  errors[field].touched = true;
  isControlInvalid(field);
};

const validateForm = () => {
  const fields = ["email", "username", "password", "confirmPassword"];

  fields.forEach((field) => {
    handleBlur(field);
  });

  return fields.every((field) => {
    const {touched, ...errorState} = errors[field]; // Destructure to exclude "touched"
    return Object.values(errorState).every((isValid) => !isValid); // All error flags must be false
  });
};

const isControlInvalid = (field) => {
  const value = registerForm[field];
  const trimmedValue = value?.trim();
  let invalid = false;

  switch (field) {
    case "email":
      errors.email.required = !trimmedValue;
      errors.email.invalid = !(new RegExp(config.USERNAME_EMAIL_PATTERN)).test(trimmedValue);
      invalid = errors.email.required || errors.email.invalid;
      break;

    case "username":
      errors.username.required = !trimmedValue;
      errors.username.invalid = !new RegExp(config.USERNAME_CHARACTER_PATTERN).test(trimmedValue);
      errors.username.maxLength = trimmedValue?.length > config.USERNAME_MAX_LENGTH;
      invalid = errors.username.required || errors.username.invalid || errors.username.maxLength;
      break;

    case "password":
      errors.password.required = !trimmedValue;
      errors.password.minLength = trimmedValue?.length < config.PASSWORD_MIN_LENGTH;
      invalid = errors.password.required || errors.password.minLength;
      break;

    case "confirmPassword":
      errors.confirmPassword.required = !trimmedValue;
      errors.confirmPassword.notMatch = trimmedValue !== registerForm.password;
      invalid = errors.confirmPassword.required || errors.confirmPassword.notMatch;
      break;

    default:
      break;
  }

  return invalid && errors[field].touched;
};
const togglePasswordVisibility = () => {
  hidePassword.value = !hidePassword.value;
}

const toggleConfirmPasswordVisibility = () => {
  hideConfirmPassword.value = !hideConfirmPassword.value;
}

const register = async () => {
  if (isLoading.value) return;

  if (!validateForm()) return;

  isLoading.value = true;

  try {
    console.log("Trying to register...")

    const payload = {
      email: (registerForm.email || '').trim().toLowerCase(),
      username: (registerForm.username || '').trim(),
      address: null,
      password: (registerForm.password || '').trim(),
      role: 'user',
    };

    const response = await apiClient.post('/user', payload);
    console.log('User registered successfully:', response.data);

    // TODO handle login session token

    // Redirect to a success page or login
    await router.push('/login');

  } catch (e) {
    // todo handle all errors like already existing mail, username, other error and so on
    console.error('Registration error:', e)
  } finally {
    isLoading.value = false;
  }
}
</script>
