<template>
  <div
    class="flex items-center flex-row justify-between space-x-6 max-lg:space-x-5 max-sm:space-x-6"
    ref="dropdownRef"
  >
    <div v-if="loggedIn" class="tw-navbar-dropdown-container max-sm:hidden">
      <router-link to="/my-books" class="navbar-button-container btn-primary">
        <font-awesome-icon class="tw-icon text-3xl max-sm:text-2xl" :icon="faBook" />
      </router-link>
    </div>

    <div v-if="loggedIn" class="tw-navbar-dropdown-container max-sm:hidden">
      <router-link to="/my-requests" class="navbar-button-container btn-primary">
        <font-awesome-icon class="tw-icon text-3xl max-sm:text-2xl" :icon="faMessage" />
      </router-link>
    </div>

    <div
      class="tw-navbar-dropdown-container w-[40px] max-md:w-[40px] max-sm:w-[35px] p-0"
      ref="themeDropdownRef"
    >
      <button
        @click="handleThemeDropdownClick"
        id="theme-button"
        class="navbar-button-container p-0 btn-primary"
      >
        <img
          v-if="selectedTheme === Theme.Light"
          :draggable="false"
          src="../../assets/sun.svg"
          class="tw-icon w-[80px] h-auto object-contain"
          alt=""
        />
        <font-awesome-icon
          v-if="selectedTheme === Theme.Dark"
          class="tw-icon text-3xl max-sm:text-2xl"
          :icon="faMoon"
        ></font-awesome-icon>
        <font-awesome-icon
          v-if="selectedTheme === Theme.System"
          class="tw-icon text-3xl max-sm:text-2xl"
          :icon="faDesktop"
        ></font-awesome-icon>
      </button>

      <div v-if="themeDropdownOpen" class="right-0 w-28 tw-dropdown-inner-layout">
        <a
          @click="selectTheme(Theme.Light)"
          class="tw-dropdown-inner-action-layout"
          id="light-option"
        >
          <svg
            class="fill-gray-700 dark:fill-gray-300 tw-navbar-dropdown-icon h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <g>
                <path
                  d="m256,102.2c-84.8,0-153.8,69-153.8,153.8 0,84.8 69,153.8 153.8,153.8 84.8,0 153.8-69 153.8-153.8 0-84.8-69-153.8-153.8-153.8zm0,266.8c-62.3,0-113-50.7-113-113 0-62.3 50.7-113 113-113 62.3,0 113,50.7 113,113 0,62.3-50.7,113-113,113z"
                />
                <path
                  d="m59.8,235.6h-28.4c-11.3,0-20.4,9.1-20.4,20.4s9.1,20.4 20.4,20.4h28.4c11.3,0 20.4-9.1 20.4-20.4s-9.1-20.4-20.4-20.4z"
                />
                <path
                  d="m480.6,235.6h-28.4c-11.3,0-20.4,9.1-20.4,20.4s9.1,20.4 20.4,20.4h28.4c11.3,0 20.4-9.1 20.4-20.4s-9.1-20.4-20.4-20.4z"
                />
                <path
                  d="M256,80.2c11.3,0,20.4-9.1,20.4-20.4V31.4c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4v28.4    C235.6,71.1,244.7,80.2,256,80.2z"
                />
                <path
                  d="m256,431.8c-11.3,0-20.4,9.1-20.4,20.4v28.4c0,11.3 9.1,20.4 20.4,20.4s20.4-9.1 20.4-20.4v-28.4c0-11.3-9.1-20.4-20.4-20.4z"
                />
                <path
                  d="m102.8,131.7c8,8 20.9,8 28.8,0 8-8 8-20.9 0-28.8l-20.1-20.1c-8-8-20.9-8-28.8,0s-8,20.9 0,28.8l20.1,20.1z"
                />
                <path
                  d="m409.2,380.3c-8-8-20.9-8-28.8,0-8,8-8,20.9 0,28.8l20.1,20.1c8,8 20.9,8 28.8,0 8-8 8-20.9 0-28.8l-20.1-20.1z"
                />
                <path
                  d="m409.2,131.7l20.1-20.1c8-8 8-20.9 0-28.8-8-8-20.9-8-28.8,0l-20.1,20.1c-8,8-8,20.9 0,28.8 7.9,8 20.8,8 28.8-2.84217e-14z"
                />
                <path
                  d="m102.8,380.3l-20.1,20.1c-8,8-8,20.9 0,28.8 8,8 20.9,8 28.8,0l20.1-20.1c8-8 8-20.9 0-28.8-7.9-8-20.8-8-28.8,0z"
                />
                <path
                  d="m289.7,270.3c-36.9,21.6-65.3,2.2-66.9,1.1-9-6.6-21.7-4.7-28.4,4.3-6.7,9-4.9,21.8 4.1,28.5 1.4,1 23.5,17.1 56.2,17.1 16.3,0 35.2-4 55.5-15.9 9.7-5.7 13-18.2 7.3-27.9-5.6-9.6-18.1-12.9-27.8-7.2z"
                />
                <circle cx="212" cy="211.1" r="20.5" />
                <circle cx="300" cy="211.1" r="20.5" />
              </g>
            </g>
          </svg>
          Light
        </a>
        <a
          @click="selectTheme(Theme.Dark)"
          class="tw-dropdown-inner-action-layout"
          id="dark-option"
        >
          <font-awesome-icon :icon="faMoon" class="tw-navbar-dropdown-icon" />
          Dark
        </a>

        <a
          @click="selectTheme(Theme.System)"
          class="tw-dropdown-inner-action-layout"
          id="system-option"
        >
          <font-awesome-icon :icon="faDesktop" class="tw-navbar-dropdown-icon" />
          System
        </a>
      </div>
    </div>

    <div class="tw-navbar-dropdown-container">
      <button
        @click="handleAccountClick"
        id="account-button"
        class="navbar-button-container btn-primary"
      >
        <font-awesome-icon class="tw-icon text-3xl max-sm:text-2xl" :icon="faCircleUser" />
      </button>
      <div v-if="accountDropdownOpen" class="-right-4 w-44 tw-dropdown-inner-layout z-[9999]">
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

          <router-link to="/edit-location" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon
              class="tw-navbar-dropdown-icon"
              :icon="faLocationDot"
            ></font-awesome-icon>
            My Location
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/my-books" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon
              class="tw-navbar-dropdown-icon"
              :icon="faBook"
            ></font-awesome-icon>
            My Books
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/my-requests" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon
              class="tw-navbar-dropdown-icon"
              :icon="faMessage"
            ></font-awesome-icon>
            My Requests
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/bookish-map" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faMap"></font-awesome-icon>
            Bookish Map
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <a @click="logout" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon
              class="tw-navbar-dropdown-icon"
              :icon="faRightFromBracket"
            ></font-awesome-icon>
            Logout
          </a>
        </div>
        <div v-if="!loggedIn">
          <router-link to="/bookish-map" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon class="tw-navbar-dropdown-icon" :icon="faMap"></font-awesome-icon>
            Bookish Map
          </router-link>

          <div class="tw-dropdown-separator"></div>

          <router-link to="/login" class="tw-dropdown-inner-action-layout">
            <font-awesome-icon
              class="tw-navbar-dropdown-icon"
              :icon="faRightToBracket"
            ></font-awesome-icon>
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

<script setup lang="ts">
import {
  faBook,
  faCircleUser,
  faDesktop,
  faGear,
  faLocationDot,
  faMap,
  faMessage,
  faMoon,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user.ts';
import { Theme } from '@/enums/theme.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

let accountDropdownOpen = ref(false);
let themeDropdownOpen = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);
const themeDropdownRef = ref<HTMLDivElement | null>(null);
let selectedTheme = ref<Theme>(Theme.Light);

let username = computed(() => userStore.user?.username || 'username');
const authStore = useAuthStore();
const loggedIn = computed(() => authStore.isLoggedIn);

const handleAccountClick = () => {
  accountDropdownOpen.value = !accountDropdownOpen.value;
};

const handleThemeDropdownClick = () => {
  themeDropdownOpen.value = !themeDropdownOpen.value;
  accountDropdownOpen.value &&= false;
};

const logout = () => {
  authStore.clearToken();
  userStore.clearUser();
  console.log('User logged out');
  router.push("/");
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    accountDropdownOpen.value &&
    dropdownRef.value &&
    event.target instanceof Node &&
    !dropdownRef.value.contains(event.target)
  ) {
    accountDropdownOpen.value = false;
  }

  if (
    themeDropdownOpen.value &&
    themeDropdownRef.value &&
    event.target instanceof Node &&
    !themeDropdownRef.value.contains(event.target)
  ) {
    themeDropdownOpen.value = false;
  }
};

const initializeTheme = () => {
  const savedTheme = window.localStorage.getItem('SELECTED_THEME') as Theme;
  selectedTheme.value = savedTheme || Theme.Light;
  applyTheme(selectedTheme.value);
};

const selectTheme = (theme: Theme) => {
  selectedTheme.value = theme;
  themeDropdownOpen.value = false;
  window.localStorage.setItem('SELECTED_THEME', theme);
  applyTheme(theme);
};

const applyTheme = (theme: Theme) => {
  switch (theme) {
    case Theme.Light:
      document.body.classList.remove('dark');
      break;
    case Theme.Dark:
      document.body.classList.add('dark');
      break;
    default:
      applySystemTheme();
  }
};

const applySystemTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  prefersDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');
};

function handleSystemThemeChange(event: MediaQueryListEvent) {
  if (selectedTheme.value === Theme.System) {
    event.matches ? document.body.classList.add('dark') : document.body.classList.remove('dark');
  }
}

onMounted(() => {
  initializeTheme();

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemThemeChange);

  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.removeEventListener('change', handleSystemThemeChange);

  document.removeEventListener('click', handleClickOutside);
});
</script>
