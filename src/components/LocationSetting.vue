<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700"
    >
      <div class="tw-heading mb-0 mt-2">Your Location</div>
      <div class="text-xl text-gray-600 dark:text-gray-400 mb-5 text-center">
        Click on the map to set your location and find books near you
      </div>

      <LocationSelectionMap @locationSelected="onLocationSelected" />

      <div class="w-full mb-2 flex flex-row space-x-16 mt-5 items-center">
        <button
          @click="skipLocationSetting"
          id="skip-button"
          class="btn-primary btn-blue bg-blue-600 hover:bg-blue-700 w-[50%] rounded-2xl"
        >
          Skip
        </button>
        <button
          :disabled="isLoading || !selectedLocation"
          @click="handleLocationSetting"
          class="w-[50%] btn-primary btn-blue rounded-2xl"
          id="finish-button"
          type="submit"
        >
          <div class="flex items-center justify-center">
            <div v-if="isLoading" class="tw-loading-animation mr-2"></div>
            <div>Finish</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router/index.ts';
import LocationSelectionMap from '@/components/LocationSelectionMap.vue';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { authenticationService } from '@/services/AuthenticationService.ts';
import { userService } from '@/services/UserService.ts';
import { useUserStore } from '@/stores/user.ts';

const isLoading = ref(false);
const selectedLocation = ref<{ lat: number; lng: number } | null>(null);

const userStore = useUserStore();

const skipLocationSetting = async () => {
  await authenticationService.setInitialLogin(userStore.user?.id ?? '');
  userStore.setUser({ initialLoginPending: false });
  await router.push('/');
};

const onLocationSelected = (location: { lat: number; lng: number } | null) => {
  selectedLocation.value = location;
};

const handleLocationSetting = async () => {
  try {
    if (!selectedLocation.value) {
      Snackbar.showSnackbar(
        'Please select a location on the map or skip to login',
        SnackbarType.ERROR,
      );
      return;
    }

    isLoading.value = true;

    const payload = {
      latitude: selectedLocation.value.lat,
      longitude: selectedLocation.value.lng,
    };

    await userService.setLocation(userStore.user?.id ?? '', payload);
    userStore.setAddress(payload.latitude, payload.longitude);

    await authenticationService.setInitialLogin(userStore.user?.id ?? '');
    userStore.setUser({ initialLoginPending: false });

    await router.push('/');

    Snackbar.showSnackbar('Location was set successfully', SnackbarType.SUCCESS);
  } catch (e) {
    Snackbar.showSnackbar(
      'There was an error setting the location, check out console',
      SnackbarType.ERROR,
    );
    console.error('Error handling location setting:', e);
  } finally {
    isLoading.value = false;
  }
};
</script>
