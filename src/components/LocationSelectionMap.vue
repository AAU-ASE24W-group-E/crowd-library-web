<template>
  <div id="map-container" class="w-full h-[300px] rounded-lg relative">
    <div id="map" class="w-full h-full rounded-lg"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import L, { Map, Marker } from "leaflet";
import "leaflet-control-geocoder";

let map: Map;
let marker: Marker;

onMounted(() => {
  map = L.map("map").setView([46.625, 14.306], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // TODO remove
  marker = L.marker([46.625, 14.306])
    .addTo(map)
    .bindPopup("This is your location.")
    .openPopup();

  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
  });

  geocoder.on("markgeocode", (e: any) => {
    const { center, name } = e.geocode;
    map.setView(center, 13);
    marker.setLatLng(center).bindPopup(name).openPopup();
  });

  geocoder.addTo(map);
});
</script>
