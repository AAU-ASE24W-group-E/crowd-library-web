<template>
  <div id="map-container" class="w-full h-full rounded-lg relative">
    <div id="map" class="w-full h-[300px] rounded-lg"></div>
<!--    <div class="absolute top-2 left-2 z-10 bg-white p-2 rounded shadow">-->
    <div>
      <p v-if="clickedLocation">Lat: {{ clickedLocation.lat.toFixed(5) }}, Lng: {{ clickedLocation.lng.toFixed(5) }}</p>
      <button
        @click="resetMarker"
        class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reset Marker
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import L, { type LeafletMouseEvent, Map, Marker } from "leaflet";
import "leaflet-control-geocoder";

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
  L.circleMarker([46.625, 14.306], {
    radius: 3,
    color: "red",
    fillColor: "red",
    fillOpacity: 1,
  })
    .addTo(map)
    .bindPopup("This is your location.")
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
