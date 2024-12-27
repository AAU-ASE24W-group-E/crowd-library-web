<template>
  <footer
    class="tw-component-container py-3 rounded-lg mt-auto mb-2 max-sm:p-4 justify-between flex-row max-sm:flex-col dark:bg-dark-mode-inside bg-blue-100">

    <router-link to="/" class="contents">
      <img
        src="../assets/logo_simple.png"
        class="h-12 object-cover max-sm:mb-4"
        alt=""/>
    </router-link>

    <div class="flex max-lg:self-center flex-col items-center">
      <div
        class="w-full flex items-center pb-2 justify-center font-medium space-x-16"
      >
        <router-link to="/imprint"
                     class="tw-link-style">
          Imprint
        </router-link>

        <router-link to="/data-privacy"
                     class="tw-link-style">
          Privacy Policy
        </router-link>
      </div>

      <div class="flex self-stretch items-start flex-col">
        <span class="self-stretch text-center max-sm:mb-4 dark:text-dark-mode-text">
                © {{ currentYear }} CrowdLibrary.at
        </span>
      </div>
    </div>

    <div
      class="flex items-center flex-row justify-between space-x-8 max-md:space-x-4 max-sm:space-x-8"
    >
      <a
        class="tw-icon"
        rel="noopener noreferrer"
        target="_blank"
      >
        <font-awesome-icon class="text-3xl" :icon="faYoutube" :title="'Our YouTube channel'"></font-awesome-icon>
      </a>
      <a
        class="tw-icon"
        rel="noopener noreferrer"
        target="_blank"
      >
        <font-awesome-icon class="text-3xl" :icon="faGithub" :title="'Our GitHub Repository'"></font-awesome-icon>
      </a>
      <a
        class="tw-icon"
        rel="noopener noreferrer"
        target="_blank"
      >
        <font-awesome-icon class="text-3xl" :icon="faInstagram" :title="'Our Instagram'"></font-awesome-icon>
      </a>
    </div>

  </footer>
</template>


<script setup>
import {faGithub, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {ref} from "vue";

const currentYear = ref(new Date().getFullYear());
</script>
