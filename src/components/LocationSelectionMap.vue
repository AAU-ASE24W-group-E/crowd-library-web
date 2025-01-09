<template>
  <div id="map-container" class="w-full h-full rounded-lg relative">
    <div id="map" class="w-full h-[300px] rounded-lg cursor-pointer"></div>
    <div class="flex flex-row justify-between">
      <p class="text-gray-400 text-sm">Lat: {{ clickedLocation?.lat.toFixed(5) || '-' }}, Lng: {{ clickedLocation?.lng.toFixed(5) || '-' }}</p>
      <font-awesome-icon v-if="clickedLocation" @click="resetMarker" :icon="faTrashCan" :title="'Click to delete your location'" class="tw-icon"></font-awesome-icon>
    </div>
  </div>
</template>

<!--TODO darkmode, data handling & mobile-->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import L, { type LeafletMouseEvent, Map, Marker } from "leaflet";
import "leaflet-control-geocoder";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

const clickedLocation = ref<{ lat: number; lng: number } | null>(null);

let map: Map;
let marker: Marker | null = null;

const onMapClick = (e: LeafletMouseEvent) => {
  const { lat, lng } = e.latlng;

  clickedLocation.value = { lat, lng };

  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lng])
    .addTo(map)
    // .bindPopup(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`)
    .bindPopup(`Your selected location`)
    .openPopup();
};

const resetMarker = () => {
  if (marker) {
    map.removeLayer(marker);
    marker = null;
    clickedLocation.value = null;
  }
};

onMounted(() => {
  map = L.map("map").setView([46.625, 14.306], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Initial marker
  L.circleMarker([46.62395, 14.30776], {
    radius: 2,
    color: "red",
    fillColor: "red",
    fillOpacity: 1,
  })
    .addTo(map)
    .openPopup();

  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
  });

  geocoder.on("markgeocode", (e: any) => {
    const { center, name } = e.geocode;
    map.setView(center, 13);
    if (marker) {
      map.removeLayer(marker);
    }
    marker = L.marker(center).addTo(map).bindPopup(name).openPopup();
    clickedLocation.value = { lat: center.lat, lng: center.lng };
  });

  geocoder.addTo(map);

  map.on("click", onMapClick);
});
</script>
