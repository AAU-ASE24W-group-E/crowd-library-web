<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700 ">
      <div class="tw-heading mb-5 mt-2 ">Register</div>
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
</script>
