<template>
  <div class="flex items-center justify-center">
    <div
      class="flex justify-start flex-col items-center relative rounded-lg w-[450px] max-sm:w-11/12 h-auto px-4 bg-white dark:bg-gray-700"
    >
      <div class="tw-heading mb-0 mt-2">Edit Location</div>
      <div class="text-xl text-gray-600 dark:text-gray-400 mb-5 text-center">
        The pin displays your current location. If you wish to change it, drag it to the desired position and click
        “Apply”. If you do not wish to change it, click “Cancel”.
      </div>

      <LocationSelectionMap @locationSelected="onLocationSelected" />

      <div class="w-full mb-2 flex flex-row space-x-16 mt-5 items-center">
        <button
          @click="cancelLocationSetting"
          id="cancel-button"
          class="btn-primary btn-blue bg-blue-600 hover:bg-blue-700 w-[50%] rounded-2xl"
        >
          Cancel
        </button>
        <button
          :disabled="isLoading || !selectedLocation"
          @click="handleLocationEdit"
          id="apply-button"
          class="w-[50%] btn-primary btn-blue rounded-2xl"
          type="submit"
        >
          <div class="flex items-center justify-center">
            <div v-if="isLoading" class="tw-loading-animation mr-2"></div>
            <div>Apply</div>
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
import { userService } from '@/services/UserService.ts';
import { useUserStore } from '@/stores/user.ts'

const isLoading = ref(false);
const selectedLocation = ref<{ lat: number; lng: number } | null>(null);

const userStore = useUserStore();


const cancelLocationSetting = async () => {
  await router.push('/');
};

const onLocationSelected = (location: { lat: number; lng: number } | null) => {
  selectedLocation.value = location;
};

const handleLocationEdit = async () => {
  try {
    if (!selectedLocation.value) {
      Snackbar.showSnackbar(
        'Please select a location on the map or cancel location editing',
        SnackbarType.ERROR,
      );
      return;
    }

    isLoading.value = true;

    const payload = {
      latitude: selectedLocation.value.lat,
      longitude: selectedLocation.value.lng,
    };

    // TODO -DONE uid has to be set

    await userService.updateLocation(userStore.user?.id ?? "", payload);

    Snackbar.showSnackbar('Location was set successfully', SnackbarType.SUCCESS);
    await router.push('/login');
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
