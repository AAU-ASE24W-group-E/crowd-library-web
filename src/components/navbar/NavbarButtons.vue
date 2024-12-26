<template>
  <div class="flex items-center flex-row justify-between space-x-6 max-lg:space-x-5 max-sm:space-x-6"
       ref="dropdownRef">
    <div class="tw-navbar-dropdown-container">
      <button
        @click=""
        class="navbar-button-container btn-primary"
      >
        <font-awesome-icon class="tw-icon text-2xl" :icon="faClipboardList"/>
      </button>
    </div>

    <div class="tw-navbar-dropdown-container">
      <button
        @click=""
        class="navbar-button-container btn-primary"
      >
        <font-awesome-icon class="tw-icon text-2xl" :icon="faBook"/>
      </button>
    </div>

    <div class="tw-navbar-dropdown-container">
      <button
        @click="handleAccountClick"
        id="account-button"
        class="navbar-button-container btn-primary"
      >
        <font-awesome-icon class="tw-icon text-2xl" :icon="faCircleUser"/>
      </button>
<!--      TODO dynamic width-->
      <div v-if="dropdownAccountOpen" class="-right-4 w-44 tw-dropdown-inner-layout">
        <div v-if="loggedIn">
          <a
            class="px-2 py-2 text-base text-gray-700 dark:text-title-dark-mode-text flex items-center cursor-default"
          >
        <span class="flex flex-row">
          <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faUser"></font-awesome-icon>
          <span class="font-medium"> {{ username }}</span>
        </span>
          </a>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/account-settings" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faGear"></font-awesome-icon>
            Account Settings
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/location" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faLocationDot"></font-awesome-icon>
            My Location
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/wishlist" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faHeart"></font-awesome-icon>
            My Wishlist
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/bookish-map" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faMap"></font-awesome-icon>
            Bookish Map
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <a @click="logout" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faRightFromBracket"></font-awesome-icon>
            Logout
          </a>
        </div>
        <div v-if="!loggedIn">
          <router-link to="/login" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faRightToBracket"></font-awesome-icon>
            Login
          </router-link>

          <div class="tw-dropdown-separator"></div>
          <router-link to="/register" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faUser"></font-awesome-icon>
            Register
          </router-link>

          <div class="tw-dropdown-separator"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  faBook,
  faCircleUser,
  faClipboardList,
  faGear,
  faHeart,
  faLocationDot,
  faMap,
  faRightFromBracket, faRightToBracket,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onMounted, onUnmounted, ref} from "vue";

let dropdownAccountOpen = ref(false);
let username = 'undefined';
let loggedIn = ref(false);
const dropdownRef = ref(null);

const handleAccountClick = () => {
  dropdownAccountOpen.value = !dropdownAccountOpen.value;
}

const logout = () => {
  // TODO
  console.warn("Not implemented");
}

const handleClickOutside = (event) => {
  if (
    dropdownAccountOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    dropdownAccountOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});


</script>
