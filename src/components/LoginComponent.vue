<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700 ">
      <div class="tw-heading mb-5 mt-2 ">Login</div>
      <form
        @submit.prevent="login"
        class="flex flex-col items-center w-full h-full mb-3 "
      >
        <div class="w-full mb-6 ">
          <label for="username-email" class="tw-input-label">
            Username or Email
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300" :icon="faEnvelope"/>
            </div>
            <input
              class="tw-input"
              v-bind:class="{ 'tw-input-error': isControlInvalid('usernameOrEmail') }"
              v-model="loginForm.usernameOrEmail"
              id="username-email"
              autocomplete="username"
              type="text"
              :placeholder="'Enter username or email'"
            />
            <div class="relative">
              <div :class="{
                  'opacity-100 visible': isControlInvalid('usernameOrEmail'),
                  'opacity-0 invisible': !isControlInvalid('usernameOrEmail'),
                }" class="tw-input-error-label">
                <div v-if="errors.usernameOrEmail.required">
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
            />
            <button
              type="button"
              @click="test"
              class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400"
            >
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300"
                                 :icon="hidePassword ? 'eyeSlash' : 'eye'" :title="'Toggle password visibility'"/>
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
        <div class="flex flex-row w-full mb-6 justify-end">
          <router-link class="text-end text-base text-link-style max-sm:text-center" to="/reset-password">
            Forgot your password?
          </router-link>
        </div>

        <div class="w-full mb-2">
          <button
            :disabled="isLoading"
            class="w-full btn-primary btn-blue"
            type="submit"
          >
            <div class="flex items-center justify-center">
              <div v-if="isLoading" class="tw-loading-animation"></div>
              <div class="ml-2">Login</div>
            </div>
          </button>
        </div>

        <span class="text-hint-style">When you sign in, you accept the Terms of Use and acknowledge the Privacy Statement and Cookie Policy.</span>
        <span class="mt-2 text-hint-style text-base">Don't have an account yet?</span>
        <router-link class="text-link-style" to="/register">
          Click here to register
        </router-link>


      </form>
    </div>
  </div>
</template>


<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faEnvelope, faEye, faEyeSlash, faLock} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

library.add(faEye, faEyeSlash); // TODO


const router = useRouter();

const loginForm = reactive({
  usernameOrEmail: "",
  password: "",
})

const errors = reactive({
  usernameOrEmail: {required: false},
  password: {required: false},
});

const hidePassword = ref(false);
const isLoading = ref(false);

// TODO make utility function?
const isControlInvalid = (field) => {
  const value = loginForm[field];
  const isEmpty = !value || value.trim() === "";
  errors[field].required = isEmpty;
  return isEmpty;
};

const validateForm = () => {
  const fields = ["usernameOrEmail", "password"];
  fields.forEach((field) => isControlInvalid(field));
  return fields.every((field) => !errors[field].required);
};

function test() {
  const hidePassword = false;
  console.log("Hallo")
}
</script>
