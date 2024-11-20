<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700"
    >
      <div class="tw-heading mb-5 mt-2">Register</div>

      <form @submit.prevent="register" class="flex flex-col items-center w-full h-full mb-3">
        <div class="w-full mb-6">
          <label for="username-email" class="tw-input-label"> Username</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon
                class="tw-icon text-gray-500 dark:text-gray-300"
                :icon="faEnvelope"
              />
            </div>
            <input
              class="tw-input"
              v-bind:class="{ 'tw-input-error': isControlInvalid('usernameOrEmail') }"
              v-model="loginForm.usernameOrEmail"
              id="username-email"
              autocomplete="username"
              type="text"
              :placeholder="'Enter username or email'"
              @blur="handleBlur('usernameOrEmail')"
            />
            <div class="relative">
              <div
                :class="{
                  'opacity-100 visible': isControlInvalid('usernameOrEmail'),
                  'opacity-0 invisible': !isControlInvalid('usernameOrEmail'),
                }"
                class="tw-input-error-label"
              >
                <div v-if="errors.usernameOrEmail.required">This field is required</div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mb-6">
          <label for="username-email" class="tw-input-label">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon
                class="tw-icon text-gray-500 dark:text-gray-300"
                :icon="faEnvelope"
              />
            </div>
            <input
              class="tw-input"
              v-bind:class="{ 'tw-input-error': isControlInvalid('usernameOrEmail') }"
              v-model="loginForm.usernameOrEmail"
              id="username-email"
              autocomplete="username"
              type="text"
              :placeholder="'Enter username or email'"
              @blur="handleBlur('usernameOrEmail')"
            />
            <div class="relative">
              <div
                :class="{
                  'opacity-100 visible': isControlInvalid('usernameOrEmail'),
                  'opacity-0 invisible': !isControlInvalid('usernameOrEmail'),
                }"
                class="tw-input-error-label"
              >
                <div v-if="errors.usernameOrEmail.required">This field is required</div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mb-2">
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
              v-model="loginForm.password"
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

        <div class="w-full mb-2">
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
              v-model="loginForm.password"
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
      </form>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

library.add(faEye, faEyeSlash) // TODO

const router = useRouter()

const loginForm = reactive({
  usernameOrEmail: '',
  password: '',
})

const errors = reactive({
  usernameOrEmail: { required: false, touched: false },
  password: { required: false, touched: false },
})

const hidePassword = ref(true)
const hideConfirmPassword = ref(true)
const isLoading = ref(false)

const isControlInvalid = (field) => {
  const value = loginForm[field]
  const isEmpty = !value || value.trim() === ''
  errors[field].required = isEmpty
  return isEmpty && errors[field].touched
}
</script>
