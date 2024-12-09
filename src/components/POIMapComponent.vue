<template>
  <div class="tw-heading mb-5 mt-2">Bookish Map</div>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import maplibregl from 'maplibre-gl';
import { MapLibreSearchControl } from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";



onMounted(() => {
const map = new maplibregl.Map({
  container: 'map',
  style: {
    'version': 8,
    'sources': {
      'raster-tiles': {
        'type': 'raster',
        'tiles': [
          'https://tile.openstreetmap.de/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'OpenStreetMap'
      }
    },
    'layers': [
      {
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 22
      }
    ]
  },
  center: [14.26492, 46.616308], 
  zoom: 8,
  attributionControl: false
}); 

const control = new MapLibreSearchControl({
  maxResults: 5,
  onResultSelected: feature => {
    console.log(feature.geometry.coordinates);
},});
map.addControl(control, "top-left");

map.on('mousedown', (e) => {
if (e.originalEvent.button !== 1) return;
});

// map.addControl(new maplibregl.NavigationControl());
});


</script>


