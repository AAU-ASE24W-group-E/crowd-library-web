<template>
  <div
    class="tw-component-container dark:bg-dark-mode-inside rounded-lg py-5 mt-2 h-20 bg-blue-100"
  >
    <!--Browser-->
    <div class="w-full h-full flex items-center justify-between">
      <router-link to="/">
        <img
          src="../assets/logo_simple.png"
          alt="logo"
          class="w-20 h-20 mr-12 object-contain pr-8 decoration-0"
        />
      </router-link>
      <nav
        class="lg:flex-1 lg:flex lg:items-center lg:flex-row lg:justify-start max-lg:flex max-lg:items-start max-lg:self-start max-lg:flex-col w-full"
      >
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <font-awesome-icon
              class="tw-icon text-gray-500 dark:text-gray-300"
              :icon="faSearch"
            />
          </div>
          <input class="tw-input w-full rounded-3xl h-9" :placeholder="'Search by title, author, ISBN...'">
        </div>
      </nav>

      <div class="flex justify-end max-lg:justify-end ml-10">
        <!--       TODO-->
      </div>

    </div>
  </div>
</template>

<script setup>
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>
