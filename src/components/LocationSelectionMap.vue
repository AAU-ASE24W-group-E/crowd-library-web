<template>
  <div id="map-container" class="w-full h-full rounded-lg relative">
    <div id="map" class="w-full h-[300px] rounded-lg cursor-pointer"></div>
    <div class="flex flex-row justify-between mt-1">
      <p class="text-gray-400 text-sm">
        Lat: {{ clickedLocation?.lat.toFixed(5) || '-' }}, Lng:
        {{ clickedLocation?.lng.toFixed(5) || '-' }}
      </p>
      <font-awesome-icon
        v-if="clickedLocation"
        @click="resetMarker"
        :icon="faTrashCan"
        :title="'Click to delete your location'"
        class="tw-icon"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, ref } from 'vue';
import L, { type LeafletMouseEvent, Map, Marker } from 'leaflet';
import 'leaflet-control-geocoder';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import config from '@/config.json';

const emit = defineEmits<{
  (e: 'locationSelected', location: { lat: number; lng: number } | null): void;
}>();
const clickedLocation = ref<{ lat: number; lng: number } | null>(null);
const userLocation = ref<{ lat: number, lng: number } | null>(null);     // TODO fetch user location from backend
// const userLocation = ref<{ lat: number; lng: number } | null>({
//   lat: 40.7128,
//   lng: -74.006,
// });

let map: Map;
let marker: Marker | null = null;

const onMapClick = (e: LeafletMouseEvent) => {
  const { lat, lng } = e.latlng;

  clickedLocation.value = { lat, lng };
  emit('locationSelected', clickedLocation.value);

  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lng]).addTo(map).bindPopup(`Your selected location`).openPopup();
};

const resetMarker = () => {
  if (marker) {
    map.removeLayer(marker);
    marker = null;
    clickedLocation.value = null;
    emit('locationSelected', null);
  }
};

onMounted(() => {
  const initialCoordinates = userLocation.value
    ? [userLocation.value.lat, userLocation.value.lng]
    : config.DEFAULT_SAVED_LOCATION;

  map = L.map('map').setView(initialCoordinates, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Initial marker
  L.circleMarker(initialCoordinates, {
    radius: 2,
    color: 'red',
    fillColor: 'red',
    fillOpacity: 1,
  })
    .addTo(map)
    .bindPopup(
      userLocation.value ? `Your saved location` : `Default location (Click to set your location)`,
    )
    .openPopup();

  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
  });

  geocoder.on('markgeocode', (e: any) => {
    const { center, name } = e.geocode;
    map.setView(center, 13);
    if (marker) {
      map.removeLayer(marker);
    }
    marker = L.marker(center).addTo(map).bindPopup(name).openPopup();
    clickedLocation.value = { lat: center.lat, lng: center.lng };
    emit('locationSelected', clickedLocation.value);
  });

  geocoder.addTo(map);

  map.on('click', onMapClick);
});
</script>
