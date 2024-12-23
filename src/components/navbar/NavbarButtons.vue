<template>
  <div class="flex items-center flex-row justify-between space-x-6 max-lg:space-x-1">
    <div class="tw-navbar-dropdown-container">
      <button
        @click="toggleWishListDropdown"
        class="navbar-button-container btn-primary"
      >
        <font-awesome-icon class="tw-icon text-2xl" :icon="faClipboardList"/>
      </button>


    </div>

    <div class="tw-navbar-dropdown-container">
      <button
        @click="toggleWishListDropdown"
        class="navbar-button-container btn-primary"
      >
        <font-awesome-icon class="tw-icon text-2xl" :icon="faBook"/>
      </button>


    </div>

    <div class="tw-navbar-dropdown-container">
      <button
        @click="toggleWishListDropdown"
        class="navbar-button-container btn-primary"
      >
        <font-awesome-icon class="tw-icon text-2xl" :icon="faCircleUser"/>
      </button>


    </div>
  </div>
</template>

<!--circle-user, clipboard-list -->

<script setup>
//
import {faBook, faCircleUser, faClipboardList} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const toggleWishListDropdown = () => {
  console.log("works")
}
</script>
