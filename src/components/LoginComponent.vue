<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700">
      <div class="tw-heading mt-2">Login</div>
      <form
        @submit.prevent="login"
        class="flex flex-col items-center w-full h-full mb-3"
      >
        <div class="w-full mb-6">
          <label for="username-email" class="tw-input-label">
            Username or Email
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <font-awesome-icon class="tw-icon text-gray-500 dark:text-gray-300" :icon="faEnvelope"/>
            </div>
            <input
              class="tw-input"
              id="username-email"
              autocomplete="username"
              type="text"
            />
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
              autocomplete="current-password"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
</script>
