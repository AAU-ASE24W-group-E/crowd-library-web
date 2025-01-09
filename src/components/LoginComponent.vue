<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700">
      <div class="tw-heading mb-5 mt-2">Login</div>
      <form
        @submit.prevent="login"
        class="flex flex-col items-center w-full h-full mb-3"
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
              @blur="handleBlur('usernameOrEmail')"
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
              <div v-if="isLoading" class="tw-loading-animation mr-2"></div>
              <div>Login</div>
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
import {authenticationService} from "@/services/AuthenticationService.ts";
import {Snackbar} from "@/utility/snackbar.ts";
import {SnackbarType} from "@/enums/snackbar.ts";

library.add(faEye, faEyeSlash);


const router = useRouter();

const loginForm = reactive({
  usernameOrEmail: "",
  password: "",
})

const errors = reactive({
  usernameOrEmail: {required: false, touched: false},
  password: {required: false, touched: false},
});

const hidePassword = ref(true);
const isLoading = ref(false);

const isControlInvalid = (field) => {
  const value = loginForm[field];
  const isEmpty = !value || value.trim() === "";
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
  const fields = ["usernameOrEmail", "password"];

  fields.forEach((field) => {
    errors[field].touched = true;
    isControlInvalid(field);
  });

  return fields.every((field) => !errors[field].required);
};

const login = async () => {
  if (isLoading.value) return;

  if (!validateForm()) return;

  isLoading.value = true;

  try {
    // Simulation of delay to prevent bruteforce attempts
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    let usernameOrEmail = (loginForm.usernameOrEmail || "").trim().toLowerCase();
    console.log(usernameOrEmail);

    const response = await authenticationService.login({username: usernameOrEmail, password: loginForm.password});
    const token = response.data.token;
    Snackbar.showSnackbar('Successfully logged in!', SnackbarType.SUCCESS);
    console.log("Login successful: ", token)

    //TODO handle unverified email logic
    /*if (!result.emailVerified) {
        // handling...
        return;
        }*/

    // Successful log in attempt
    await router.push("/");
  } catch (e) {
    // TODO handle error cases
    Snackbar.showSnackbar('An unexpected error occurred, check console', SnackbarType.ERROR);
    console.error("Login error:", e);
  } finally {
    isLoading.value = false;
  }
}
</script>
