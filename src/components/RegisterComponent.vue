<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700">
      <div class="tw-heading mb-5 mt-2">Register</div>

      <form
        @submit.prevent="register"
        class="flex flex-col items-center w-full h-full mb-3">
        <div class="w-full mb-6">
          <label for="email" class="tw-input-label"> Email</label>
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
                :icon="faEnvelope"
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
                <div v-if="errors.password.required">
                  This field is required
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
              :type="hidePassword ? 'password' : 'text'"
              v-model="registerForm.confirmPassword"
              autocomplete="current-password"
              :placeholder="'******'"
              @blur="handleBlur('confirmPassword')"
            />
            <button
              type="button"
              @click="toggleConfirmPasswordVisibility"
              class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400"
            >
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300"
                                 :icon="hidePassword ? 'eye-slash' : 'eye'" :title="'Toggle password visibility'"/>
            </button>
            <div class="relative">
              <div :class="{
                  'opacity-100 visible': isControlInvalid('confirmPassword'),
                  'opacity-0 invisible': !isControlInvalid('confirmPassword'),
                }"
                   class="tw-input-error-label">
                <div v-if="errors.confirmPassword.required">
                  This field is required
                </div>
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
import {faEnvelope, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'

library.add(faEye, faEyeSlash) // TODO

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
  email: {required: false, touched: false},
  username: {required: false, touched: false},
  password: {required: false, touched: false},
  confirmPassword: {required: false, touched: false},
})
const handleBlur = (field) => {
  errors[field].touched = true;
  isControlInvalid(field);
};

const isControlInvalid = (field) => {
  const value = registerForm[field]
  const isEmpty = !value || value.trim() === ''
  errors[field].required = isEmpty
  return isEmpty && errors[field].touched
}

const togglePasswordVisibility = () => {
  hidePassword.value = !hidePassword.value;
}

const toggleConfirmPasswordVisibility = () => {
  hideConfirmPassword.value = !hideConfirmPassword.value;
}
</script>
